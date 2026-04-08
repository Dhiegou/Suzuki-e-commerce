---
trigger: model_decision
description: When working with App.tsx or root application structure, to ensure it only handles routing, layout composition, and high-level providers without business logic.
---

# Rule Module — App.tsx Constraints

This document defines strict constraints for the `App.tsx` file.

These rules MUST be enforced by the governance layer.

---

# 🎯 Purpose

`App.tsx` is the **application orchestrator**, not a logic container.

It must remain clean, predictable, and focused on composition.

---

# ✅ Allowed Responsibilities

The following are the ONLY allowed responsibilities in `App.tsx`:

- Routing (e.g., React Router configuration)
- Layout composition (wrapping pages with layout components)
- High-level providers (e.g., Context Providers, Theme Providers)

---

# ❌ Forbidden Responsibilities

The following are STRICTLY forbidden in `App.tsx`:

### 1. Business Logic
- Data transformation
- Conditional flows tied to domain logic
- Any logic that belongs to hooks or services

---

### 2. API Calls
- Fetch/axios requests
- Async data fetching
- Side effects related to external services

---

### 3. Form Logic
- Validation
- Input handling
- Submission logic

---

### 4. Complex State Management
- Multiple `useState` chains controlling behavior
- `useReducer` with domain logic
- Derived state or computed state

---

### 5. Side Effects
- `useEffect` with business or lifecycle logic
- DOM manipulation
- Event listeners

---

# ⚠️ Allowed Exceptions (Strict)

The following are allowed ONLY if minimal and structural:

- Providers initialization (e.g., `<AuthProvider>`)
- Basic routing state (e.g., location awareness)

These MUST NOT contain business logic.

---

# 🧱 Structural Rule

`App.tsx` must act ONLY as:

→ A composition layer  
→ A routing entry point  

It must delegate ALL logic to:

- Components
- Custom hooks
- Contexts

---

# 🚨 Violation Handling

If any forbidden responsibility is detected:

→ The structure MUST be refactored  
→ Logic MUST be moved to appropriate layers  

No exceptions allowed.