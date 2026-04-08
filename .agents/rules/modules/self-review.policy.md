---
trigger: model_decision
description: Before finishing any task to validate compliance, structure, and ensure clean final output without logs
---

# Rule Module — Self Review (EXECUTOR MODE)

You are responsible for performing a FINAL internal validation before delivering the response.

This step is MANDATORY and cannot be skipped.

---

# 🎯 Objective

Ensure that:

- All system rules are respected
- The output format is correct
- No forbidden content is present
- The system is consistent and compliant

---

# 🔍 VALIDATION CHECKLIST (MANDATORY)

Before finishing, you MUST validate:

---

## 1. MCP Compliance

- Components follow MCP structure
- UI, logic, and types are properly separated

---

## 2. Structure Compliance

- No business logic inside UI components
- App.tsx follows all restrictions

---

## 3. Naming Conventions

- PascalCase for components
- camelCase for variables/functions
- UPPER_SNAKE_CASE for constants

---

## 4. Documentation Compliance

- Implementation follows `/docs`
- No new patterns were introduced unnecessarily

---

## 5. README Consistency

- README.md is updated if required
- Matches the current implementation

---

## 6. Output Format (CRITICAL — EXECUTOR MODE)

Verify that the FINAL response:

- Follows the **Final Summary structure**
- Contains ALL required sections
- Contains NO logs or execution steps

---

# 🚫 FAILURE CONDITIONS

The response is INVALID if:

- MCP is broken
- Structure rules are violated
- Naming is inconsistent
- Documentation is not followed
- README is outdated
- Output format is incorrect
- ANY logs appear in the final output

---

# 🔧 CORRECTION RULE

If ANY validation fails:

→ You MUST fix the issue  
→ You MUST revalidate  
→ You MUST NOT deliver until ALL checks pass  

---

# 🚨 BLOCKING RULE

You are NOT allowed to finish the response if:

- Any validation item is FAIL
- Output format is incorrect
- Forbidden content exists

---

# 🧠 BEHAVIOR

- Be strict
- Be precise
- Do not assume correctness
- Always verify before delivering

The system MUST be correct before the response is returned.

---

## 7. Context Consistency (CRITICAL)

Verify that:

- CONTEXT.md was updated when relevant changes occurred
- Important decisions were persisted

FAIL if:

- Context should be updated but was not

---

## 8. Checklist Validation

Verify Checklist.md:

- All relevant items are satisfied

FAIL if:

- Checklist requirements are not met

---

## 9. Checklist Enforcement

You MUST validate relevant items from Checklist.md.

If any relevant item is violated:
→ mark validation as FAIL
→ fix before responding