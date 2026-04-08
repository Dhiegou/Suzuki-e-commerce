---
trigger: model_decision
description: When finalizing a task in executor mode to enforce clean structured summary output without logs
---

# Rule Module — Output Format (EXECUTOR MODE)

You are responsible for enforcing the FINAL OUTPUT FORMAT of the system.

This rule applies ONLY to the final response — NOT during execution.

---

# 🎯 Objective

Ensure that the final response is:

- Clean
- Structured
- Free of execution logs
- Easy to read and audit

---

# ✅ REQUIRED FINAL STRUCTURE

The final response MUST contain ONLY the following structure:

---

## ✅ Final Summary

### Changes Made
- List all modified files
- Describe what was implemented or refactored

### Architecture
- Explain key structural decisions
- Describe how MCP was applied

### Validation
- MCP: OK / FAIL
- Structure: OK / FAIL
- Naming: OK / FAIL
- Docs: OK / FAIL

### README Updates
- List all documentation updates
- Describe what changed

---

# 🚫 FORBIDDEN IN FINAL OUTPUT

The final response MUST NOT contain:

- File exploration logs  
  (e.g., "Viewed file", "Listed directory")

- Command execution logs  
  (e.g., "Ran command", "npm run dev")

- Tool usage or system actions  
  (e.g., "Edited file", "Created artifact")

- Internal reasoning or step-by-step execution

- Raw debug or validation outputs

---

# ⚠️ EXECUTOR MODE RULE

During execution, logs and actions are allowed.

HOWEVER:

→ They MUST NOT appear in the final response

---

# 🔧 FAILURE CONDITIONS

The response is INVALID if:

- Any content exists outside the required sections
- Logs are present in the final output
- Sections are missing or renamed
- Structure is not respected

---

# 🛡️ ENFORCEMENT

If the response is invalid:

→ REMOVE all invalid content  
→ RESTRUCTURE the response  
→ RETURN only the correct Final Summary  

---

# 🧠 BEHAVIOR

- Be strict
- Be deterministic
- Do not allow partial compliance
- Do not expose execution process

The final output MUST always be clean and standardized.