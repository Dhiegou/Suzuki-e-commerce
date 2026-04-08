# LGPD Compliance Policy — Nova Suzuki

This document defines ALL data protection rules that MUST be enforced by the system and AI agents.

---

# 🎯 1. Core Principle

The system MUST follow:

- Data Minimization
- Explicit Consent
- Security by Design

No data collection is allowed outside these rules.

---

# 🔐 2. Data Collection Rules (EXECUTABLE)

## ✅ Allowed

### Navigation Data
- User-agent
- Masked IP
- Pages visited
- Garage state (`suzuki_garage`)

### Leads (Forms)
- Name
- Email
- Phone
- CPF (ONLY when required for purchase intent)

---

## ❌ Forbidden

- Storing CPF in localStorage
- Storing sensitive data in browser storage
- Collecting data without consent
- Sending data to external services without disclosure

---

# ⚙️ 3. Consent Enforcement (MANDATORY)

The system MUST:

- Display a consent checkbox
- Block submission WITHOUT consent

---

## Rule

```text
IF lgpdConsent !== true
→ BLOCK form submission

---

🧠 4. Local Storage Rules
Allowed
Non-sensitive data only
Example: vehicle selection (suzuki_garage)
Forbidden
CPF
Email (unless strictly necessary)
Phone
Any personally identifiable sensitive data
🔐 5. Security Requirements
HTTPS (TLS/SSL) is mandatory
Backend must enforce encryption at rest
No exposure of sensitive data in frontend logs
🗂️ 6. Data Retention
Leads inactive > 5 years → MUST be deleted or anonymized
🌐 7. External Navigation Rules

If redirecting to external domains:

MUST NOT include personal data in query params
MUST warn user if leaving the platform
🍪 8. Cookie & Tracking Policy
Rule

IF cookies or tracking are used:
→ Cookie Banner is MANDATORY

Current Status
Cookie Banner: NOT implemented ❌
Tracking: Limited ⚠️
🚨 9. Risk Enforcement

The system MUST flag as FAIL if:

Sensitive data is stored in localStorage
Forms submit without consent
Documentation mismatches implementation
External redirects leak data
🧠 10. Agent Behavior

Agents MUST:

Enforce all rules above
Refuse invalid implementations
Refactor code that violates LGPD
Validate forms before submission logic
📄 11. Documentation Consistency

This file MUST be consistent with:

Components.md
Architecture.md
README.md
Routes.md
🔒 FINAL RULE

LGPD compliance is NOT optional.

Any violation:

→ MUST be fixed BEFORE delivery
→ MUST block the response