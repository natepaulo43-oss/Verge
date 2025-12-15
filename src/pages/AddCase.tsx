import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import type { CaseType } from '../types';

export default function AddCase() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryOfOrigin: '',
    currentStatus: '',
    email: '',
    phone: '',
    caseType: '' as CaseType | '',
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    navigate('/app/clients');
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Case</h1>
        <p className="text-gray-600">Create a new immigration case for a client</p>
      </div>

      {/* Progress Steps */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s <= step
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    s < step ? 'bg-gray-900' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-sm font-medium text-gray-900">Client Info</span>
          <span className="text-sm font-medium text-gray-900">Case Type</span>
          <span className="text-sm font-medium text-gray-900">Documents</span>
          <span className="text-sm font-medium text-gray-900">Review</span>
        </div>
      </div>

      {/* Form Steps */}
      {step === 1 && (
        <div className="card p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Client Basic Information</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Country of Origin *
                </label>
                <input
                  type="text"
                  value={formData.countryOfOrigin}
                  onChange={(e) => setFormData({ ...formData, countryOfOrigin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="Enter country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Current Immigration Status *
                </label>
                <input
                  type="text"
                  value={formData.currentStatus}
                  onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="e.g., F-1, H-1B, Tourist"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button onClick={() => navigate('/app/clients')} className="btn-secondary">
              Cancel
            </button>
            <button
              onClick={() => setStep(2)}
              disabled={!formData.firstName || !formData.lastName || !formData.countryOfOrigin || !formData.currentStatus}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Case Type</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'work_visa', label: 'Work Visa (H-1B, L-1, etc.)' },
              { value: 'family_based', label: 'Family-Based Immigration' },
              { value: 'green_card', label: 'Green Card / Permanent Residency' },
              { value: 'citizenship', label: 'Citizenship / Naturalization' },
              { value: 'student_visa', label: 'Student Visa (F-1, M-1)' },
              { value: 'asylum', label: 'Asylum / Refugee Status' },
              { value: 'employment_based', label: 'Employment-Based Immigration' },
              { value: 'other', label: 'Other' },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setFormData({ ...formData, caseType: type.value as CaseType })}
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  formData.caseType === type.value
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold text-gray-900 mb-1">{type.label}</div>
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(1)} className="btn-secondary">
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!formData.caseType}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Initial Documents</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-900 font-medium mb-2">Drag and drop files here</p>
            <p className="text-gray-600 text-sm mb-4">or</p>
            <label className="btn-primary inline-block cursor-pointer">
              Browse Files
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </label>
            <p className="text-gray-500 text-xs mt-4">Supports: PDF, DOC, DOCX, JPG, PNG</p>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2 mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Uploaded Files ({uploadedFiles.length})</h3>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-900">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(2)} className="btn-secondary">
              Back
            </button>
            <button onClick={() => setStep(4)} className="btn-primary">
              Next Step
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="card p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Review & Create Case</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Client Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                <p><span className="font-medium">Country:</span> {formData.countryOfOrigin}</p>
                <p><span className="font-medium">Current Status:</span> {formData.currentStatus}</p>
                {formData.email && <p><span className="font-medium">Email:</span> {formData.email}</p>}
                {formData.phone && <p><span className="font-medium">Phone:</span> {formData.phone}</p>}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Case Type</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="capitalize">{formData.caseType?.replace('_', ' ')}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Documents</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{uploadedFiles.length} file(s) uploaded</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(3)} className="btn-secondary">
              Back
            </button>
            <button onClick={handleSubmit} className="btn-primary">
              Create Case
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
