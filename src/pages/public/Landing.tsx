import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Target, Zap, Shield, Users } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">Verge Immigration</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">
                Pricing
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Immigration Case Management,
            <span className="block mt-2">Simplified</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Automate document preparation, reduce errors, and streamline your immigration law
            practice with Verge. Generate required forms instantly based on case type.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/onboarding" className="btn-primary text-lg px-8 py-4">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
            <Link to="/pricing" className="btn-secondary text-lg px-8 py-4">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Immigration Law Firms
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage cases efficiently
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="card p-8">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Automated Document Generation
              </h3>
              <p className="text-gray-600">
                Select case type and automatically generate all required immigration forms with
                pre-populated data from client profiles.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Error Detection</h3>
              <p className="text-gray-600">
                Catch missing documents, conflicting information, and incomplete fields before
                submission to prevent costly rejections.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Collaboration</h3>
              <p className="text-gray-600">
                Multi-user access with role-based permissions. Lawyers and paralegals work
                together seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Reduce Manual Work by 70%
              </h2>
              <ul className="space-y-4">
                {[
                  'Auto-populate forms based on case type',
                  'One-click document packet generation',
                  'Real-time case status tracking',
                  'Built-in review workflow',
                  'Export finalized packets instantly',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-gray-900 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900 rounded-2xl p-12 text-white">
              <div className="text-6xl font-bold mb-4">70%</div>
              <div className="text-2xl mb-8">Time Saved on Document Prep</div>
              <div className="space-y-4 text-gray-300">
                <div className="flex justify-between">
                  <span>Average case completion</span>
                  <span className="font-semibold text-white">3 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Error reduction</span>
                  <span className="font-semibold text-white">95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Client satisfaction</span>
                  <span className="font-semibold text-white">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Immigration Practice?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your 14-day free trial. No credit card required.
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
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
