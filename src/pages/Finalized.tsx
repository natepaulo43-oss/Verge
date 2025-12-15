import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, CheckCircle, Eye } from 'lucide-react';

const mockFinalizedCases = [
  {
    id: '1',
    clientName: 'Ahmed Hassan',
    caseType: 'Green Card',
    finalizedDate: 'Nov 30, 2024',
    approvedBy: 'Matthew Parker',
    documentsCount: 15,
  },
  {
    id: '2',
    clientName: 'Li Chen',
    caseType: 'Work Visa (L-1)',
    finalizedDate: 'Nov 25, 2024',
    approvedBy: 'Sarah Johnson',
    documentsCount: 10,
  },
  {
    id: '3',
    clientName: 'Isabella Romano',
    caseType: 'Citizenship',
    finalizedDate: 'Nov 18, 2024',
    approvedBy: 'Michael Chen',
    documentsCount: 20,
  },
];

export default function Finalized() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredCases = mockFinalizedCases.filter((c) =>
    c.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalized Cases</h1>
        <p className="text-gray-600">Completed and approved immigration cases</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Total Finalized</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">963</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">This Month</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">42</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">This Week</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">8</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search finalized cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="all">All Time</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      {/* Finalized Cases List */}
      <div className="space-y-4">
        {filteredCases.map((caseItem) => (
          <div key={caseItem.id} className="card card-hover p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {caseItem.clientName}
                  </h3>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span>
                    <span className="font-medium">Type:</span> {caseItem.caseType}
                  </span>
                  <span>
                    <span className="font-medium">Finalized:</span> {caseItem.finalizedDate}
                  </span>
                  <span>
                    <span className="font-medium">Approved by:</span> {caseItem.approvedBy}
                  </span>
                  <span>
                    <span className="font-medium">Documents:</span> {caseItem.documentsCount}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/app/clients/${caseItem.id}`}
                  className="btn-secondary flex items-center gap-2 text-sm px-3 py-2"
                >
                  <Eye className="w-4 h-4" />
                  View
                </Link>
                <button className="btn-primary flex items-center gap-2 text-sm px-3 py-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-gray-600">No finalized cases found.</p>
        </div>
      )}
    </div>
  );
}
