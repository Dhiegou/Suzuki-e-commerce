# Application Routes — Nova Suzuki

This document defines all application routes and API contracts.

It is the source of truth for:

- Frontend navigation
- Page responsibilities
- Backend integration
- Access control

---

# 🎯 1. Routing Architecture

The application follows:

- SPA routing
- Route-based page composition

---

## Rule

- `App.tsx` MUST only handle routing and layout
- Pages MUST orchestrate components
- Pages MUST NOT contain business logic

---

# 🧭 2. Frontend Routes

---

## `/` → `<Home />`

**Status:** Active  
**Access:** Public  

**Responsibilities:**

- Render main sections
- Orchestrate components

---

## `/modelo/:id` → `<ModeloPage />`

**Status:** Planned  
**Access:** Public  

**Rules:**

- Route param MUST be accessed via router hook
- Data fetching MUST be abstracted into a hook
- UI MUST NOT fetch data directly

---

## `/consorcio` → `<ConsorcioPage />`

**Status:** Planned  
**Access:** Public  

**Rules:**

- Forms MUST follow LGPD policy
- Logic MUST be handled via hooks

---

## `/concessionarias` → `<DealersPage />`

**Status:** Planned  
**Access:** Public  

**Rules:**

- Map logic MUST be abstracted
- UI MUST remain declarative

---

## `/checkout` → `<Checkout />`

**Status:** Planned  
**Access:** Authenticated User  

**Rules:**

- MUST enforce authentication
- MUST NOT expose sensitive data
- MUST follow LGPD rules

---

## `/admin` → `<Dashboard />`

**Status:** Planned  
**Access:** Admin Only  

**Rules:**

- MUST enforce role-based access
- MUST NOT expose admin logic in UI

---

# 🔐 3. Access Control Rules

- Protected routes MUST enforce authentication
- Role-based routes MUST validate permissions
- Unauthorized access MUST be blocked

---

# 🔄 4. Data Fetching Rules

Frontend MUST:

- Use hooks for API interaction
- NEVER fetch inside UI components
- Keep API logic isolated

---

# 📡 5. API Contracts

---

## A. Motorcycles

### `GET /api/v1/motorcycles` ✅ Implemented

- Returns list of active motorcycles
- Response: `{ success: true, data: MotorcycleResponseDTO[] }`

---

### `GET /api/v1/motorcycles/:id` ✅ Implemented

- Returns detailed product by ID
- Response: `{ success: true, data: MotorcycleResponseDTO }`
- 404 if not found

---

## B. Leads

### `POST /api/v1/leads/newsletter` ✅ Implemented

- Requires explicit LGPD consent
- Validates email format
- Rate limited: 10/hour
- Payload: `{ email: string, lgpdConsent: boolean }`

---

### `POST /api/v1/leads/contact` ✅ Implemented

- Validates all fields (nome, cpf, email, telefone, cep, concessionaria)
- Enforces LGPD rules (consent required, CPF hashed)
- Rate limited: 10/hour
- Payload: `{ nome, cpf, email, telefone, cep, concessionaria, modeloInteresse?, lgpdConsent }`

---

## C. Health

### `GET /api/v1/health` ✅ Implemented

- Returns server status and timestamp

---

## D. Cart & Checkout (Planned)

- `POST /api/v1/cart/add`
- `DELETE /api/v1/cart/remove/:itemId`
- `POST /api/v1/checkout/reserve`

---

# ⚠️ 6. Frontend–Backend Contract

- Frontend MUST follow API structure
- No hardcoded data when API exists
- All requests MUST be handled via hooks/services

---

# 🧠 7. Evolution Rules

When adding new routes:

- MUST be documented here
- MUST define access level
- MUST define responsibilities

---

# 🔒 8. Source of Truth

If implementation differs from this document:

→ The implementation MUST be refactored