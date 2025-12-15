import { useState } from 'react';
import { Save, User, Building, Bell, Shield } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and firm preferences</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="col-span-1">
          <div className="card p-4">
            <nav className="space-y-1">
              {[
                { id: 'account', label: 'Account', icon: User },
                { id: 'firm', label: 'Firm', icon: Building },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'security', label: 'Security', icon: Shield },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="col-span-3">
          {activeTab === 'account' && (
            <div className="card p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Matthew"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Parker"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="matthew.parker@lawfirm.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Role</label>
                  <select
                    defaultValue="admin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <button className="btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'firm' && (
            <div className="card p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Firm Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Firm Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Parker Immigration Law"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Business Address
                  </label>
                  <input
                    type="text"
                    defaultValue="123 Legal Plaza, Suite 500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">City</label>
                    <input
                      type="text"
                      defaultValue="New York"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">State</label>
                    <input
                      type="text"
                      defaultValue="NY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      defaultValue="10001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Subscription Status
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                      Active
                    </span>
                    <span className="text-gray-600">Trial ends in 7 days</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <button className="btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Email Notifications</div>
                    <div className="text-sm text-gray-600">
                      Receive email updates about case status changes
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Document Reviews</div>
                    <div className="text-sm text-gray-600">
                      Notify when documents are ready for review
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Error Alerts</div>
                    <div className="text-sm text-gray-600">
                      Immediate alerts for case errors or flags
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Weekly Summaries</div>
                    <div className="text-sm text-gray-600">
                      Weekly digest of case activity and metrics
                    </div>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <button className="btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                    <div>
                      <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-600">
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <button className="btn-secondary text-sm">Enable</button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <button className="btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
