import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, AlertCircle, AlertTriangle, Info, ChevronRight } from 'lucide-react';

const mockErrors = [
  {
    id: '1',
    clientName: 'Maria Rodriguez',
    caseType: 'Work Visa (H-1B)',
    severity: 'high' as const,
    message: 'Missing required document: Educational Certificate',
    field: 'Documents',
    createdAt: '1 hour ago',
  },
  {
    id: '2',
    clientName: 'Raj Patel',
    caseType: 'Employment-Based',
    severity: 'high' as const,
    message: 'Conflicting dates on Form I-485 and passport',
    field: 'Form I-485',
    createdAt: '3 hours ago',
  },
  {
    id: '3',
    clientName: 'Sofia Martinez',
    caseType: 'Student Visa',
    severity: 'medium' as const,
    message: 'Incomplete field: Current address',
    field: 'Personal Information',
    createdAt: '1 day ago',
  },
  {
    id: '4',
    clientName: 'Chen Wei',
    caseType: 'Family-Based',
    severity: 'low' as const,
    message: 'Recommendation: Update contact phone number',
    field: 'Contact Information',
    createdAt: '2 days ago',
  },
];

export default function Errors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  const filteredErrors = mockErrors
    .filter((e) => e.clientName.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((e) => severityFilter === 'all' || e.severity === severityFilter);

  const severityConfig = {
    high: {
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: AlertCircle,
      iconColor: 'text-red-600',
      label: 'Critical',
    },
    medium: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      label: 'Warning',
    },
    low: {
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Info,
      iconColor: 'text-blue-600',
      label: 'Info',
    },
  };

  const highPriorityCount = mockErrors.filter((e) => e.severity === 'high').length;
  const mediumPriorityCount = mockErrors.filter((e) => e.severity === 'medium').length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Errors & Flags</h1>
        <p className="text-gray-600">Issues requiring attention to prevent case rejection</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="card p-6 border-l-4 border-red-500">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-gray-600">Critical Issues</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{highPriorityCount}</div>
        </div>
        <div className="card p-6 border-l-4 border-yellow-500">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-600">Warnings</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{mediumPriorityCount}</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Resolved Today</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">12</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search errors and flags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="all">All Severities</option>
            <option value="high">Critical Only</option>
            <option value="medium">Warnings Only</option>
            <option value="low">Info Only</option>
          </select>
        </div>
      </div>

      {/* Errors List */}
      <div className="space-y-4">
        {filteredErrors.map((error) => {
          const config = severityConfig[error.severity];
          const Icon = config.icon;

          return (
            <Link
              key={error.id}
              to={`/app/clients/${error.id}`}
              className={`card card-hover p-6 block border-l-4 ${config.color}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <Icon className={`w-6 h-6 ${config.iconColor} flex-shrink-0 mt-1`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {error.clientName}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                        {config.label.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium mb-2">{error.message}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span>
                        <span className="font-medium">Case Type:</span> {error.caseType}
                      </span>
                      <span>
                        <span className="font-medium">Field:</span> {error.field}
                      </span>
                      <span>
                        <span className="font-medium">Detected:</span> {error.createdAt}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>

      {filteredErrors.length === 0 && (
        <div className="card p-12 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <p className="text-gray-900 font-semibold mb-2">No errors or flags found!</p>
          <p className="text-gray-600">All cases are in good standing.</p>
        </div>
      )}
    </div>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
