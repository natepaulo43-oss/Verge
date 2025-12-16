import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Target } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

type SignInStep = 'credentials' | 'verify';

interface SignInResponse {
  twoFactorRequired?: boolean;
  tempToken?: string;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

interface VerifyResponse {
  accessToken: string;
  refreshToken: string;
  message?: string;
}

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [tempToken, setTempToken] = useState('');
  const [step, setStep] = useState<SignInStep>('credentials');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const payload: SignInResponse = await response.json();
      if (!response.ok) {
        throw new Error(payload.message ?? 'Unable to sign in');
      }

      if (payload.twoFactorRequired && payload.tempToken) {
        setTempToken(payload.tempToken);
        setStep('verify');
        setInfo('Open your authenticator app and enter the 6-digit code.');
      } else if (payload.accessToken && payload.refreshToken) {
        localStorage.setItem('verge_access_token', payload.accessToken);
        localStorage.setItem('verge_refresh_token', payload.refreshToken);
        navigate('/app');
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-2fa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempToken, code: twoFactorCode }),
      });

      const payload: VerifyResponse = await response.json();
      if (!response.ok) {
        throw new Error(payload.message ?? 'Invalid verification code');
      }

      localStorage.setItem('verge_access_token', payload.accessToken);
      localStorage.setItem('verge_refresh_token', payload.refreshToken);
      setInfo('Verification successful! Redirecting...');
      navigate('/app');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchAccount = () => {
    setStep('credentials');
    setTempToken('');
    setTwoFactorCode('');
    setInfo('');
    setError('');
  };

  const renderCredentialsForm = () => (
    <form onSubmit={handleCredentialsSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="you@lawfirm.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        <a href="#" className="text-sm text-gray-900 hover:underline font-medium">
          Forgot password?
        </a>
      </div>

      <button type="submit" className="btn-primary w-full" disabled={isLoading}>
        {isLoading ? 'Signing In…' : 'Sign In'}
      </button>
    </form>
  );

  const renderTwoFactorForm = () => (
    <form onSubmit={handleVerifySubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Authentication Code
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="\d{6}"
          maxLength={6}
          value={twoFactorCode}
          onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 tracking-widest text-center text-lg"
          placeholder="000000"
          required
        />
      </div>

      <p className="text-sm text-gray-600">
        We sent this challenge because your account has two-factor authentication enabled. Codes
        refresh every 30 seconds in your authenticator app.
      </p>

      <div className="space-y-3">
        <button type="submit" className="btn-primary w-full" disabled={isLoading}>
          {isLoading ? 'Verifying…' : 'Verify & Continue'}
        </button>
        <button
          type="button"
          className="btn-secondary w-full"
          onClick={handleSwitchAccount}
          disabled={isLoading}
        >
          Use a different account
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">Verge Immigration</span>
          </Link>
        </div>
      </nav>

      {/* Sign In Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md">
          <div className="card p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {step === 'credentials' ? 'Sign In to Your Account' : 'Verify Two-Factor Code'}
              </h2>
              <p className="text-gray-600 mt-2">
                {step === 'credentials'
                  ? 'Enter your email and password to continue.'
                  : `Signed in as ${email || 'your account'}`}
              </p>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}
            {info && (
              <div className="mb-4 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                {info}
              </div>
            )}

            {step === 'credentials' ? renderCredentialsForm() : renderTwoFactorForm()}

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <Link to="/onboarding" className="text-gray-900 font-semibold hover:underline">
                Start free trial
              </Link>
            </p>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            By signing in, you agree to our{' '}
            <a href="#" className="text-gray-900 hover:underline">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="text-gray-900 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
