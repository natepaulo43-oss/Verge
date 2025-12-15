import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Clock } from 'lucide-react';

const mockCases = [
  {
    id: '1',
    clientName: 'Chen Wei',
    caseType: 'Family-Based',
    progress: 45,
    lastUpdated: '2 hours ago',
    assignedTo: 'Sarah Johnson',
  },
  {
    id: '2',
    clientName: 'Raj Patel',
    caseType: 'Employment-Based',
    progress: 70,
    lastUpdated: '1 day ago',
    assignedTo: 'Michael Chen',
  },
  {
    id: '3',
    clientName: 'Sofia Martinez',
    caseType: 'Student Visa',
    progress: 30,
    lastUpdated: '3 days ago',
    assignedTo: 'Sarah Johnson',
  },
  {
    id: '4',
    clientName: 'Oleksandr Koval',
    caseType: 'Asylum',
    progress: 60,
    lastUpdated: '5 days ago',
    assignedTo: 'Matthew Parker',
  },
];

export default function InProgress() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCases = mockCases.filter((c) =>
    c.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">In Progress Cases</h1>
        <p className="text-gray-600">Active immigration cases currently being processed</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Total Active</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{mockCases.length}</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Avg. Progress</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">51%</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Updated Today</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">1</div>
        </div>
      </div>

      {/* Search */}
      <div className="card p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search active cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((caseItem) => (
          <Link
            key={caseItem.id}
            to={`/app/clients/${caseItem.id}`}
            className="card card-hover p-6 block"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {caseItem.clientName}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{caseItem.caseType}</span>
                  <span>•</span>
                  <span>Assigned to {caseItem.assignedTo}</span>
                  <span>•</span>
                  <span>Updated {caseItem.lastUpdated}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Progress</span>
                <span className="text-sm font-semibold text-gray-900">{caseItem.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gray-900 h-2 rounded-full transition-all"
                  style={{ width: `${caseItem.progress}%` }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-gray-600">No active cases found.</p>
        </div>
      )}
    </div>
  );
}
