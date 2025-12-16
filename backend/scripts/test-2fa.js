const speakeasy = require('speakeasy');

const BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:3000';

async function request(path, init) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = body?.message ?? res.statusText;
    throw new Error(`${init?.method ?? 'GET'} ${path} failed: ${message}`);
  }
  return body;
}

async function main() {
  const email = `qa+${Date.now()}@verge.local`;
  const password = 'Testing123!';

  console.log(`Signing up ${email}`);
  const signup = await request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      firmName: 'QA Law',
      address: '123 Test St',
      city: 'Testville',
      state: 'TX',
      zip: '73301',
      firstName: 'QA',
      lastName: 'Bot',
      email,
      password,
      phone: '+15125550123',
    }),
  });

  const secret = signup?.twoFactorEnrollment?.secret;
  if (!secret) {
    throw new Error('Signup succeeded but no 2FA secret returned.');
  }
  console.log('Received 2FA secret. Signing in to trigger challenge…');

  const signin = await request('/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const tempToken = signin?.tempToken;
  if (!tempToken) {
    throw new Error('Sign-in response missing tempToken.');
  }

  const code = speakeasy.totp({ secret, encoding: 'base32' });
  console.log(`Generated TOTP code ${code} – verifying…`);

  const verify = await request('/auth/verify-2fa', {
    method: 'POST',
    body: JSON.stringify({ tempToken, code }),
  });

  if (!verify?.accessToken || !verify?.refreshToken) {
    throw new Error('2FA verification succeeded but tokens missing.');
  }

  console.log('2FA flow successful ✅');
  console.log({
    user: verify.user,
    firm: verify.firm,
  });
}

main().catch((err) => {
  console.error('2FA test failed:', err.message);
  process.exitCode = 1;
});
