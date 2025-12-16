import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import * as speakeasy from 'speakeasy';
import type { GeneratedSecret } from 'speakeasy';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Verify2faDto } from './dto/verify-2fa.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signUp(dto: SignUpDto) {
    const normalizedEmail = dto.email.toLowerCase();
    const existingUser = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const passwordHash = await argon2.hash(dto.password);
    const totpSecret: GeneratedSecret = speakeasy.generateSecret({
      length: 20,
      name: `Verge (${normalizedEmail})`,
    });

    const firm = await this.prisma.firm.create({
      data: {
        name: dto.firmName,
        address: dto.address,
        city: dto.city,
        state: dto.state,
        zip: dto.zip,
      },
      select: { id: true, name: true },
    });

    const user = await this.prisma.user.create({
      data: {
        firmId: firm.id,
        email: normalizedEmail,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        role: 'admin',
        twoFactorSecret: totpSecret.base32,
        twoFactorStatus: 'pending',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
      },
    });

    return {
      firm,
      user,
      twoFactorEnrollment: {
        type: 'totp',
        secret: totpSecret.base32,
        provisioningUri: totpSecret.otpauth_url,
      },
    };
  }

  async signIn(dto: SignInDto) {
    const normalizedEmail = dto.email.toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { firm: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await argon2.verify(user.passwordHash, dto.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tempToken = this.jwt.sign(
      {
        sub: user.id,
        firmId: user.firmId,
        type: '2fa',
      },
      {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '5m',
      },
    );

    return {
      twoFactorRequired: true,
      tempToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        twoFactorStatus: user.twoFactorStatus,
      },
      firm: {
        id: user.firm.id,
        name: user.firm.name,
        planTier: user.firm.planTier,
      },
    };
  }

  async verifyTwoFactor(dto: Verify2faDto) {
    let payload: { sub: string; firmId: string; type: string };
    try {
      payload = this.jwt.verify(dto.tempToken, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (payload.type !== '2fa') {
      throw new UnauthorizedException('Token is not a 2FA challenge');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: { firm: true },
    });

    if (!user || !user.twoFactorSecret) {
      throw new UnauthorizedException('User not found or 2FA not configured');
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: dto.code,
      window: 1,
    });

    if (!verified) {
      throw new UnauthorizedException('Invalid verification code');
    }

    if (user.twoFactorStatus !== 'verified') {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { twoFactorStatus: 'verified' },
      });
      user.twoFactorStatus = 'verified';
    }

    const tokens = this.generateTokens(user.id, user.firmId);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        twoFactorStatus: user.twoFactorStatus,
      },
      firm: {
        id: user.firm.id,
        name: user.firm.name,
        planTier: user.firm.planTier,
      },
    };
  }

  private generateTokens(userId: string, firmId: string) {
    const accessToken = this.jwt.sign(
      { sub: userId, firmId },
      {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '1h',
      },
    );

    const refreshToken = this.jwt.sign(
      { sub: userId, firmId, type: 'refresh' },
      {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '30d',
      },
    );

    return { accessToken, refreshToken };
  }
}
