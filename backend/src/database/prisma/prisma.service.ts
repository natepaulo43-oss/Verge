import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { PrismaClient as PrismaClientType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const PrismaClient: typeof PrismaClientType = require('@prisma/client').PrismaClient;

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly config: ConfigService) {
    const datasourceUrl = config.get<string>('DATABASE_URL');
    if (!datasourceUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    const pool = new Pool({ connectionString: datasourceUrl });
    const adapter = new PrismaPg(pool);

    super({
      adapter: adapter,
      log: ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
