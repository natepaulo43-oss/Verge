import { Link } from 'react-router-dom';
import { Check, Target } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: 'per month',
      description: 'Perfect for solo practitioners',
      features: [
        'Up to 50 active cases',
        '2 team members',
        '10GB document storage',
        'All case types supported',
        'Email support',
      ],
    },
    {
      name: 'Professional',
      price: '$299',
      period: 'per month',
      description: 'For growing law firms',
      features: [
        'Up to 200 active cases',
        '10 team members',
        '50GB document storage',
        'All case types supported',
        'Priority support',
        'Custom templates',
        'Advanced reporting',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact sales',
      description: 'For large firms',
      features: [
        'Unlimited cases',
        'Unlimited team members',
        'Unlimited storage',
        'All case types supported',
        'Dedicated support',
        'Custom templates',
        'Advanced reporting',
        'API access',
        'Custom integrations',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">Verge Immigration</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link to="/signin" className="text-gray-600 hover:text-gray-900 font-medium">
                Sign In
              </Link>
              <Link to="/onboarding" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">
          Choose the plan that fits your firm. All plans include a 14-day free trial.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card p-8 relative ${
                plan.popular ? 'border-2 border-gray-900' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-gray-600 ml-2">/ month</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{plan.period}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/onboarding"
                className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-900'
                }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I change plans later?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                q: 'What happens after the trial?',
                a: 'After your 14-day trial, you will be automatically enrolled in your selected plan unless you cancel.',
              },
              {
                q: 'Is my data secure?',
                a: 'Yes, we use bank-level encryption and are fully compliant with data protection regulations.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'Yes, we offer a 30-day money-back guarantee if you are not satisfied with the service.',
              },
            ].map((faq, i) => (
              <div key={i} className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">Verge Immigration</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">
                Terms
              </a>
              <a href="#" className="hover:text-gray-900">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-900">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
