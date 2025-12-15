import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, Download, FileText } from 'lucide-react';
import { useState } from 'react';

export default function ClientProfile() {
  const [checklist, setChecklist] = useState([
    { id: '1', name: 'Form I-129 (Petition for Nonimmigrant Worker)', completed: true },
    { id: '2', name: 'Form I-129 Supplement', completed: true },
    { id: '3', name: 'Labor Condition Application (LCA)', completed: true },
    { id: '4', name: 'Passport Copy', completed: true },
    { id: '5', name: 'Educational Certificates', completed: false },
    { id: '6', name: 'Resume/CV', completed: false },
    { id: '7', name: 'Employment Letter', completed: false },
    { id: '8', name: 'Company Support Letter', completed: false },
  ]);

  const client = {
    firstName: 'Maria',
    lastName: 'Rodriguez',
    countryOfOrigin: 'Mexico',
    currentStatus: 'H-1B Pending',
    email: 'maria.rodriguez@example.com',
    phone: '+1 (555) 123-4567',
    caseType: 'Work Visa (H-1B)',
    status: 'For Review',
  };

  const completionPercentage = Math.round(
    (checklist.filter((item) => item.completed).length / checklist.length) * 100
  );

  const toggleChecklistItem = (id: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div>
      {/* Back Button */}
      <Link
        to="/app/clients"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Client List
      </Link>

      {/* Client Header */}
      <div className="card p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {client.firstName} {client.lastName}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span>{client.countryOfOrigin}</span>
              <span>•</span>
              <span>{client.currentStatus}</span>
            </div>
          </div>
          <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            {client.status}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
          <div>
            <div className="text-sm text-gray-600 mb-1">Email</div>
            <div className="font-medium text-gray-900">{client.email}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Phone</div>
            <div className="font-medium text-gray-900">{client.phone}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Case Type</div>
            <div className="font-medium text-gray-900">{client.caseType}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Case Checklist */}
        <div className="col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Required Documents</h2>
              <div className="text-sm">
                <span className="font-semibold text-gray-900">{completionPercentage}%</span>
                <span className="text-gray-600"> Complete</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-gray-900 h-2 rounded-full transition-all"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => toggleChecklistItem(item.id)}
                >
                  {item.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                  <span
                    className={`flex-1 ${
                      item.completed
                        ? 'text-gray-600 line-through'
                        : 'text-gray-900 font-medium'
                    }`}
                  >
                    {item.name}
                  </span>
                  <FileText className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
              <button className="btn-primary flex-1">Mark for Review</button>
              <button className="btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Packet
              </button>
            </div>
          </div>
        </div>

        {/* Status & Timeline */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Case Timeline</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900 text-sm">Case Created</div>
                  <div className="text-xs text-gray-600">Nov 15, 2024</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900 text-sm">Documents Uploaded</div>
                  <div className="text-xs text-gray-600">Nov 20, 2024</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-600 text-sm">Ready for Review</div>
                  <div className="text-xs text-gray-600">Dec 10, 2024</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                Upload New Document
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                Send to Client
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                Add Note
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm text-red-600">
                Archive Case
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
