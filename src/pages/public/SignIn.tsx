import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Target } from 'lucide-react';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app');
  };

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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Sign In to Your Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email Address
                </label>
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

              <button type="submit" className="btn-primary w-full">
                Sign In
              </button>
            </form>

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
