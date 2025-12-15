import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Target } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firmName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleSubmit = () => {
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

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      s <= step ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${s < step ? 'bg-gray-900' : 'bg-gray-200'}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Firm Details</span>
              <span>Your Account</span>
              <span>Confirm</span>
            </div>
          </div>

          {/* Step 1: Firm Details */}
          {step === 1 && (
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Firm Account</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Firm Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firmName}
                    onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="e.g., Smith Immigration Law"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Business Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!formData.firmName}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Account Details */}
          {step === 2 && (
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Account</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="you@lawfirm.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Minimum 8 characters"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={() => setStep(1)} className="btn-secondary">
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={
                      !formData.firstName ||
                      !formData.lastName ||
                      !formData.email ||
                      !formData.password
                    }
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Your Details</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Firm Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Firm Name:</span> {formData.firmName}
                    </p>
                    {formData.address && (
                      <p>
                        <span className="font-medium">Address:</span> {formData.address}
                        {formData.city && `, ${formData.city}`}
                        {formData.state && `, ${formData.state}`}
                        {formData.zipCode && ` ${formData.zipCode}`}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Account Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {formData.firstName}{' '}
                      {formData.lastName}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {formData.email}
                    </p>
                    {formData.phone && (
                      <p>
                        <span className="font-medium">Phone:</span> {formData.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Your 14-day free trial starts today.</strong> No credit card required.
                    You can cancel anytime.
                  </p>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={() => setStep(2)} className="btn-secondary">
                    Back
                  </button>
                  <button onClick={handleSubmit} className="btn-primary">
                    Create Account & Start Trial
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sign In Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/signin" className="text-gray-900 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
