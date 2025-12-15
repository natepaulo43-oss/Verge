export type CaseStatus = 'in_progress' | 'for_review' | 'finalized' | 'error';

export type CaseType = 
  | 'work_visa'
  | 'family_based'
  | 'student_visa'
  | 'asylum'
  | 'green_card'
  | 'citizenship'
  | 'employment_based'
  | 'other';

export type UserRole = 'admin' | 'staff';

export interface Firm {
  id: string;
  name: string;
  createdAt: string;
  subscriptionStatus: 'trial' | 'active' | 'canceled';
}

export interface User {
  id: string;
  firmId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface Client {
  id: string;
  firmId: string;
  firstName: string;
  lastName: string;
  countryOfOrigin: string;
  currentStatus: string;
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Case {
  id: string;
  firmId: string;
  clientId: string;
  caseType: CaseType;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  dueDate?: string;
}

export interface Document {
  id: string;
  firmId: string;
  caseId: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  url: string;
  isRequired: boolean;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

export interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  documentId?: string;
}

export interface CaseChecklist {
  caseId: string;
  requiredDocuments: RequiredDocument[];
  completionPercentage: number;
}

export interface StatusMetrics {
  forReview: number;
  inProgress: number;
  finalized: number;
  errors: number;
}

export interface CaseWithClient extends Case {
  client: Client;
  documentCount: number;
}

export interface ErrorFlag {
  id: string;
  caseId: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  field?: string;
  createdAt: string;
  resolved: boolean;
}
