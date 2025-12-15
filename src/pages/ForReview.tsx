import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, ClipboardCheck, CheckCircle } from 'lucide-react';

const mockReviewCases = [
  {
    id: '1',
    clientName: 'Maria Rodriguez',
    caseType: 'Work Visa (H-1B)',
    documentsReady: 12,
    totalDocuments: 12,
    submittedDate: 'Dec 10, 2024',
    priority: 'high',
  },
  {
    id: '2',
    clientName: 'Ahmed Hassan',
    caseType: 'Green Card',
    documentsReady: 15,
    totalDocuments: 15,
    submittedDate: 'Dec 08, 2024',
    priority: 'medium',
  },
  {
    id: '3',
    clientName: 'Yuki Tanaka',
    caseType: 'Student Visa',
    documentsReady: 8,
    totalDocuments: 8,
    submittedDate: 'Dec 05, 2024',
    priority: 'low',
  },
];

export default function ForReview() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCases = mockReviewCases.filter((c) =>
    c.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const priorityColors: Record<'high' | 'medium' | 'low', string> = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">For Review</h1>
        <p className="text-gray-600">Cases ready for your review and approval</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardCheck className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Awaiting Review</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{mockReviewCases.length}</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Reviewed Today</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">5</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardCheck className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">High Priority</span>
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
            placeholder="Search cases for review..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {filteredCases.map((caseItem) => (
          <Link
            key={caseItem.id}
            to={`/app/clients/${caseItem.id}`}
            className="card card-hover p-6 block"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {caseItem.clientName}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      priorityColors[caseItem.priority as 'high' | 'medium' | 'low']
                    }`}
                  >
                    {caseItem.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                  <span>
                    <span className="font-medium">Type:</span> {caseItem.caseType}
                  </span>
                  <span>
                    <span className="font-medium">Submitted:</span> {caseItem.submittedDate}
                  </span>
                  <span>
                    <span className="font-medium">Documents:</span> {caseItem.documentsReady}/{caseItem.totalDocuments}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    All documents ready for review
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="card p-12 text-center">
          <ClipboardCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No cases pending review.</p>
        </div>
      )}
    </div>
  );
}
