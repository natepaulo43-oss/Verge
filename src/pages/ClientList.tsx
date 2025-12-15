import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, ChevronRight } from 'lucide-react';
import type { CaseWithClient } from '../types';

const mockClients: CaseWithClient[] = [
  {
    id: '1',
    firmId: 'firm-1',
    clientId: 'client-1',
    caseType: 'work_visa',
    status: 'for_review',
    createdAt: '2024-11-15T10:00:00Z',
    updatedAt: '2024-12-10T14:30:00Z',
    client: {
      id: 'client-1',
      firmId: 'firm-1',
      firstName: 'Maria',
      lastName: 'Rodriguez',
      countryOfOrigin: 'Mexico',
      currentStatus: 'H-1B Pending',
      createdAt: '2024-11-15T10:00:00Z',
      updatedAt: '2024-12-10T14:30:00Z',
    },
    documentCount: 12,
  },
  {
    id: '2',
    firmId: 'firm-1',
    clientId: 'client-2',
    caseType: 'family_based',
    status: 'in_progress',
    createdAt: '2024-11-20T09:00:00Z',
    updatedAt: '2024-12-12T11:00:00Z',
    client: {
      id: 'client-2',
      firmId: 'firm-1',
      firstName: 'Chen',
      lastName: 'Wei',
      countryOfOrigin: 'China',
      currentStatus: 'Family Petition Filed',
      createdAt: '2024-11-20T09:00:00Z',
      updatedAt: '2024-12-12T11:00:00Z',
    },
    documentCount: 8,
  },
  {
    id: '3',
    firmId: 'firm-1',
    clientId: 'client-3',
    caseType: 'green_card',
    status: 'finalized',
    createdAt: '2024-10-01T08:00:00Z',
    updatedAt: '2024-11-30T16:00:00Z',
    client: {
      id: 'client-3',
      firmId: 'firm-1',
      firstName: 'Ahmed',
      lastName: 'Hassan',
      countryOfOrigin: 'Egypt',
      currentStatus: 'Green Card Approved',
      createdAt: '2024-10-01T08:00:00Z',
      updatedAt: '2024-11-30T16:00:00Z',
    },
    documentCount: 15,
  },
];

const statusColors = {
  in_progress: 'bg-blue-100 text-blue-800',
  for_review: 'bg-yellow-100 text-yellow-800',
  finalized: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
};

const caseTypeLabels = {
  work_visa: 'Work Visa',
  family_based: 'Family-Based',
  student_visa: 'Student Visa',
  asylum: 'Asylum',
  green_card: 'Green Card',
  citizenship: 'Citizenship',
  employment_based: 'Employment-Based',
  other: 'Other',
};

export default function ClientList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'caseType'>('name');

  const filteredClients = mockClients
    .filter((c) => {
      const fullName = `${c.client.firstName} ${c.client.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return `${a.client.firstName} ${a.client.lastName}`.localeCompare(
          `${b.client.firstName} ${b.client.lastName}`
        );
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return a.caseType.localeCompare(b.caseType);
    });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Client List</h1>
          <p className="text-gray-600">Manage all your immigration clients</p>
        </div>
        <Link to="/app/add-case" className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Client
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'status' | 'caseType')}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
            <option value="caseType">Sort by Case Type</option>
          </select>
        </div>
      </div>

      {/* Client List */}
      <div className="space-y-4">
        {filteredClients.map((clientCase) => (
          <Link
            key={clientCase.id}
            to={`/app/clients/${clientCase.clientId}`}
            className="card card-hover p-6 block"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {clientCase.client.firstName} {clientCase.client.lastName}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[clientCase.status]
                    }`}
                  >
                    {clientCase.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span>
                    <span className="font-medium">Case Type:</span>{' '}
                    {caseTypeLabels[clientCase.caseType]}
                  </span>
                  <span>
                    <span className="font-medium">Country:</span> {clientCase.client.countryOfOrigin}
                  </span>
                  <span>
                    <span className="font-medium">Documents:</span> {clientCase.documentCount}
                  </span>
                  <span>
                    <span className="font-medium">Status:</span> {clientCase.client.currentStatus}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-gray-600">No clients found matching your search.</p>
        </div>
      )}
    </div>
  );
}
