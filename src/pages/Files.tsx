import { useState } from 'react';
import { Search, Download, FileText, Filter, Folder } from 'lucide-react';

const mockFiles = [
  {
    id: '1',
    name: 'Form_I-129_Maria_Rodriguez.pdf',
    client: 'Maria Rodriguez',
    caseType: 'Work Visa',
    size: '2.4 MB',
    uploadedDate: 'Dec 10, 2024',
    type: 'application/pdf',
  },
  {
    id: '2',
    name: 'Passport_Copy_Ahmed_Hassan.pdf',
    client: 'Ahmed Hassan',
    caseType: 'Green Card',
    size: '1.8 MB',
    uploadedDate: 'Nov 30, 2024',
    type: 'application/pdf',
  },
  {
    id: '3',
    name: 'Educational_Certificate_Chen_Wei.pdf',
    client: 'Chen Wei',
    caseType: 'Family-Based',
    size: '3.2 MB',
    uploadedDate: 'Dec 12, 2024',
    type: 'application/pdf',
  },
  {
    id: '4',
    name: 'Employment_Letter_Raj_Patel.docx',
    client: 'Raj Patel',
    caseType: 'Employment-Based',
    size: '856 KB',
    uploadedDate: 'Dec 08, 2024',
    type: 'application/docx',
  },
];

export default function Files() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredFiles = mockFiles
    .filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((f) => filterType === 'all' || f.caseType === filterType);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Files Repository</h1>
        <p className="text-gray-600">All documents across immigration cases</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Folder className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Total Files</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">2,847</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">PDF Documents</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">1,923</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Word Documents</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">742</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Total Storage</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">8.2 GB</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search files by name, client, or case..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="all">All Case Types</option>
            <option value="Work Visa">Work Visa</option>
            <option value="Green Card">Green Card</option>
            <option value="Family-Based">Family-Based</option>
            <option value="Employment-Based">Employment-Based</option>
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Files Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                File Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Case Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Uploaded
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFiles.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-900">{file.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{file.client}</td>
                <td className="px-6 py-4 text-gray-600">{file.caseType}</td>
                <td className="px-6 py-4 text-gray-600">{file.size}</td>
                <td className="px-6 py-4 text-gray-600">{file.uploadedDate}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-600 hover:text-gray-900 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredFiles.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-gray-600">No files found matching your search.</p>
        </div>
      )}
    </div>
  );
}
