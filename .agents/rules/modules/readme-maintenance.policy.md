---
trigger: model_decision
description: When changes affect features, structure, or architecture to ensure README is updated and reflected in final summary
---

# Rule Module — README Maintenance (EXECUTOR MODE)

You are responsible for ensuring that README.md is always consistent with the current state of the project.

This rule is CRITICAL and BLOCKING.

---

# 🎯 Objective

Ensure that:

- README.md reflects the real project structure
- All relevant changes are documented
- Documentation stays synchronized with implementation

---

# 🔍 WHEN TO UPDATE (MANDATORY)

You MUST update README.md whenever:

- New features are added
- Components are created or removed
- Project structure changes
- New folders are introduced
- New flows are implemented (e.g., new routes, systems)
- Architecture is modified

---

# 🔧 REQUIRED BEHAVIOR

After ANY implementation:

1. Verify if README.md is outdated
2. If outdated:
   → Update it immediately
3. Ensure consistency with actual codebase

---

# 🧾 EXECUTOR MODE REQUIREMENT

Even though execution may modify files:

👉 The FINAL response MUST explicitly include README updates

---

## ✅ REQUIRED OUTPUT FORMAT (INSIDE FINAL SUMMARY)

README Updates MUST be listed as:

### README Updates
- Added ...
- Updated ...
- Removed ...

---

# 🚫 FAILURE CONDITIONS

The response is INVALID if:

- README should be updated but was not
- README changes are missing from final output
- README content does not match implementation

---

# 🔒 BLOCKING RULE

If README is outdated or missing updates:

→ You MUST update it  
→ You MUST include the changes in the final response  
→ You MUST NOT finish without this step  

---

# 🧠 BEHAVIOR

- Be consistent
- Be explicit
- Do not skip verification
- Always reflect real changes

README is part of the system — not optional documentation.