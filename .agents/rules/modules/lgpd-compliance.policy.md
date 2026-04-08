---
trigger: model_decision
description: When implementing forms or handling user data, to ensure LGPD compliance, including validation, consent enforcement, and safe handling of personal information.
---

# Rule Module — LGPD Compliance

This document defines the mandatory rules for handling personal data and form interactions in compliance with LGPD.

These rules MUST be enforced by the governance layer.

---

# 🎯 Purpose

Ensure that all user data handling complies with LGPD principles: consent, transparency, and data minimization.

---

# 📋 Form Validation (MANDATORY)

All forms MUST:

- Validate all required fields
- Prevent submission of invalid data
- Provide clear validation feedback

---

# 🔢 Input Masking (MANDATORY)

The following fields MUST use proper masks:

- CPF
- Phone number
- CEP

FAIL if:

- Masks are missing
- Incorrect formats are accepted

---

# ✅ User Consent (CRITICAL)

Forms collecting personal data MUST include:

- Explicit consent checkbox
- Clear consent wording

The system MUST:

- Block submission if consent is NOT given
- Clearly indicate consent requirement

FAIL if:

- Consent checkbox is missing
- Form submits without consent

---

# 🔐 Personal Data Handling

The agent MUST:

- Treat CPF, phone, email, and address as sensitive data
- Avoid unnecessary data collection
- Limit data usage to explicit purposes

---

# 💾 Data Persistence Rules

If data is stored (e.g., LocalStorage):

The agent MUST:

- Avoid storing sensitive personal data (e.g., CPF)
- Store only non-sensitive or necessary data
- Ensure transparency of stored data

FAIL if:

- Sensitive data is persisted unnecessarily
- Storage is used without clear purpose

---

# 📡 Data Transmission

If data is sent externally:

The agent MUST:

- Ensure data is sent only after consent
- Avoid exposing unnecessary fields
- Use secure practices (no raw exposure in logs)

---

# 🚫 Forbidden Behavior

The agent MUST NOT:

- Submit forms without user consent
- Store sensitive data without necessity
- Collect data without clear purpose
- Ignore validation rules

---

# 🚨 Violation Handling

FAIL if:

- Consent is not enforced
- Sensitive data is mishandled
- Validation is incomplete

If a violation is detected:

→ The implementation MUST be corrected  
→ The agent MUST enforce compliance BEFORE output  

No exceptions allowed.