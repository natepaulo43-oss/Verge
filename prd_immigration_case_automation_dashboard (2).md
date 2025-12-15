# Product Requirements Document (PRD)

## Product Name (Working)
**Verge Immigration Automation Platform**

## Author
Nate Paulo

## Company
Verge Technologies

## Last Updated
December 2025

---

## 1. Product Overview

The Verge Immigration Automation Platform is a **multi-tenant, firm-first** case and document automation system for U.S. immigration law firms.

It has two connected surfaces:
1. **Public Website (light MVP)** for onboarding and subscriptions (marketing + pricing + account creation)
2. **Authenticated App** (the main software) where firms manage clients, upload documents, auto-generate required forms by case type, review with a checkmark, and print/export a finalized packet.

The core value proposition is to **reduce manual document preparation, errors, and review time** by automatically generating required immigration forms based on a selected case type and client profile.

Lawyers upload source documents, select what the client is immigrating for (visa type/status/purpose), and the system **auto-populates all required government and supporting documents**. Lawyers then review, sign off with a simple checkmark, and print/export a finalized packet.

The product prioritizes:
- Speed
- Accuracy
- Minimal UI friction
- Clear case status visibility
- **Clean separation between Public Site and Authenticated App**

---

## 2. Target Users

### Primary Customer (Buyer)
- **Law Firm (Firm Account / Subscription Owner)**

### Primary Users
- **Immigration Lawyers**
- **Paralegals / Legal Assistants** (same firm tenant)

### Secondary Users (Future Scope)
- Clients (read-only or upload-only access – optional later phase)

---

## 3. Core User Goals

- Quickly onboard new clients
- Upload and organize documents in one place
- Select immigration case type and auto-generate required forms
- Review documents with minimal effort
- Identify errors or missing information early
- Finalize, sign off, and print all documents at once

---

## 4. Design & UI Principles

- **Clean, black & white, modern dashboard aesthetic** (inspired by the provided reference dashboard)
- Minimal color usage (status indicators only)
- Card-based metrics on the home page
- Left-side persistent navigation
- Simple actions (checkmark to approve, plus button to add)
- Consistency between drawn wireframe and final UI
- UI must be **developer-friendly and component-driven** for React

---

## 4.1 Technology Stack (MVP)

This section is **authoritative** and should be followed across frontend and backend development.

### Frontend (Authenticated App + Public Site)
- **React**
- **TypeScript (strict mode)** — no JavaScript files
- Functional components only
- React hooks for state and lifecycle
- Component-based architecture (reusable UI primitives)

### Styling
- Utility-first or modular styling (e.g., Tailwind CSS or CSS Modules)
- Monochrome (black & white) base theme
- Limited accent colors for status states only (e.g., error, review, finalized)

### Backend (MVP – implementation-ready, framework-agnostic)
- API-first architecture
- RESTful endpoints
- Firm-scoped multi-tenant data model
- Authentication & authorization layer (JWT or session-based)

### Data & Storage
- Relational database (Postgres-style schema assumed)
- Object storage for documents (S3/GCS-style abstraction)
- All records scoped by `firm_id`

### Non-Negotiables
- Strong typing across frontend ↔ backend contracts
- Predictable API responses
- No UI logic tied directly to database assumptions

---

## 5. App Information Architecture

### 5.1 Public Website (Light MVP)
Purpose: convert visitors → create firm account → subscribe → route into the app.

**Public pages (MVP):**
- Landing (value prop + screenshots)
- Pricing
- Onboarding / Create Firm Account
- Sign In (routes to firm login)
- Legal: Terms / Privacy

**Not required in MVP (placeholder only):**
- Full billing portal
- Advanced marketing CMS
- Blog/resources

### 5.2 Authenticated App (Main Software)

#### Global Navigation (Left Sidebar)
- Overview (Home)
- Add New Case
- Client List
- In Progress
- For Review
- Finalized
- Errors / Flags
- Files
- Settings
- Log Out

---

## 6. Dashboard / Home Page

### Purpose
Provide lawyers with a **real-time snapshot of case status and workload**.

### Components

#### Header
- Welcome message ("Welcome back, [Lawyer Name]")
- Search bar (clients, cases, documents)
- Profile menu (Account, Settings, Log Out)

#### Status Cards
- **For Review** (number of cases awaiting review)
- **In Progress** (active cases)
- **Finalized** (completed cases)
- **Errors / Flags** (cases with issues)

Each card is clickable and filters the relevant case list.

#### Optional Metrics (Later Phase)
- Avg. case completion time
- Documents generated this month

---

## 7. Add New Case (Onboarding Flow)

### Entry Point
- “+ Add New” button (from Home or Client List)

### Steps

1. **Client Basic Information**
   - First Name
   - Last Name
   - Country of Origin
   - Current Status

2. **Case Type Selection**
   - Dropdown or checklist (e.g. Work Visa, Family-Based, Student Visa, Asylum, etc.)
   - Selection determines required documents and forms

3. **Initial Document Upload**
   - Drag-and-drop upload
   - Accept PDFs, images, Word files
   - Show uploaded files as cards

4. **Auto-Population Trigger**
   - System generates required documents based on case type

---

## 8. Client List Page

### Purpose
Central directory of all clients.

### Layout
- Search bar
- Sort by name, status, case type
- List view:
  - Client Name
  - Case Type
  - Status (In Progress / For Review / Finalized / Error)

Clicking a client opens **Client Profile**.

---

## 9. Client Profile Page

### Purpose
Single source of truth for a client’s case.

### Sections

#### Client Info Panel
- Name
- Country
- Case Type
- Status

#### Case Checklist
- Required documents (auto-generated)
- Checkbox for each document

#### Status Indicator
- Auto-updates based on checklist completion

---

## 10. Document Upload Page

### Purpose
Manage all uploaded and generated documents.

### Features
- Drag-and-drop upload
- Tag documents to case or requirement
- Show existing documents
- Version tracking (future scope)

---

## 11. For Review Page

### Purpose
Minimal-friction review flow for lawyers.

### Flow
- List of clients with documents ready for review
- Click client → Document Review Screen

### Document Review Screen
- Document preview
- **Checkmark button to approve**
- Optional signature confirmation

Once all documents are approved:
- Case status → **Finalized**

---

## 12. Finalized Page

### Purpose
Access completed cases.

### Features
- List of finalized clients
- Read-only documents
- Export / Print actions

---

## 13. Print / Export Page

### Purpose
One-click generation of a complete application packet.

### Features
- "Print All" button
- Combined PDF output
- Option to export individual documents

---

## 14. Errors / Flags Page

### Purpose
Surface issues early to avoid rejection.

### Examples
- Missing required document
- Conflicting information
- Incomplete fields

### UI
- Flag icon
- Error description
- Direct link to fix issue

---

## 15. Files Page

### Purpose
File repository across all cases.

### Features
- Filter by client or case type
- Download individual files

---

## 16. Settings Page

### Sections
- Account Information
- Firm Information
- Notification Preferences
- Security & Permissions

---

## 17. Functional Requirements (MVP)

### 17.1 Identity, Access, and Multi-Tenancy
- Central **Firm Login** entry point
- Firm account creation (from Public Site onboarding)
- Users belong to exactly one Firm (tenant) for MVP
- Role support (MVP):
  - Admin (Firm owner)
  - Staff (lawyer/paralegal)
- Tenant isolation: users can only access data for their firm

### 17.2 Core App
- Document upload & storage
- Case type-based required document checklist generation
- Case status tracking (In Progress / For Review / Finalized / Error)
- Lawyer review & approval (checkmark)
- Final packet printing/export

### 17.3 Public Website (Light MVP)
- Landing + Pricing
- Create firm account
- Sign in route to firm login
- (Optional MVP) basic subscription state stored (trial/active/canceled) — no full billing portal required

---

## 18. Non-Functional Requirements

- Secure document handling (encryption at rest and in transit)
- Fast document generation and responsive UI
- Clean, intuitive UI (black & white dashboard theme)
- Scalable architecture for additional firms (tenants)
- Auditability (minimum): track who approved which document and when

---

## 19. Out of Scope (Phase 1)

- Client self-service portal (client uploads)
- Full-feature billing portal (invoices, payment methods UI)
- AI document correction / autofill from OCR (future phase)
- Advanced template builder per firm (start with standard templates)

---

## 20. Open Questions / Clarifications Needed

1. Firm onboarding: do you want **trial period** by default (e.g., 7–14 days) or paid immediately?
2. Subscription handling for MVP: should we integrate Stripe Checkout now, or store subscription state manually for early testing?
3. Roles: is Admin vs Staff enough for MVP, or do you need more granular permissions?
4. Document generation approach: do we start with a limited set of case types and templates first?
5. Do you want a firm-level “template pack” versioning system (even basic) so updates don’t break old cases?

---

## 21. Suggested Full-Stack Project Structure (MVP)

This is a recommended structure that keeps Public Site + App cleanly separated while sharing core libraries.

```
repo/
  apps/
    web/                 # Public marketing site (landing/pricing/onboarding)
      src/
        pages/ or app/
        components/
        styles/
    app/                 # Authenticated dashboard software
      src/
        pages/ or app/
        components/
        features/
          cases/
          clients/
          documents/
          review/
        styles/
  services/
    api/                 # Backend API (auth, firms, cases, docs)
      src/
        routes/
        controllers/
        middleware/
        models/
        services/
        utils/
  packages/
    shared/              # Shared types, utils, UI primitives
  infra/
    db/                  # Migrations, schema
    storage/             # Document storage config
  README.md
```

**Routing (conceptual):**
- Public Site: `/` `/pricing` `/onboarding` `/signin`
- App: `/app` (requires auth) with nested routes for dashboard pages

**Tenant model:**
- Firm created on Public Site → `firm_id`
- Users + all records scoped by `firm_id`

---

**Next Step:** Confirm MVP subscription approach (Stripe now vs placeholder), then we’ll lock auth + routing flows and finalize a frontend page-by-page spec.

