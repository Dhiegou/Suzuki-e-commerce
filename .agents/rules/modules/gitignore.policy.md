---
trigger: model_decision
description: When creating, modifying, or detecting new files, dependencies, or build artifacts, to ensure the .gitignore is correctly maintained and no sensitive or unnecessary files are versioned.
---

🎯 Purpose

Ensure the project repository remains clean, secure, and production-ready by enforcing correct .gitignore usage.

This policy prevents:

Accidental commit of sensitive data
Repository pollution with build artifacts
Versioning of unnecessary or generated files
📜 Rules
1. Sensitive Data Protection (MANDATORY)

The agent MUST ensure the following are NEVER committed:

.env
.env.*
Credentials or secrets
API keys
Database connection strings

If any of these are tracked:

→ They MUST be removed from git tracking immediately

2. Build & Runtime Files

The agent MUST ensure .gitignore includes:

node_modules/
dist/
build/
coverage/
*.log
3. Environment & System Files

The agent MUST ensure .gitignore includes:

.env
.env.*
.DS_Store
Thumbs.db
4. Backend-Specific Rules

For backend environments:

*.sqlite
*.db
*.db-journal
5. Lock & Cache Files (Context-Based)

The agent MUST evaluate whether to ignore:

.cache/
.tmp/

⚠️ BUT:

package-lock.json → MUST be versioned
pnpm-lock.yaml → MUST be versioned
6. Git Tracking Correction (MANDATORY)

If a file that should be ignored is already tracked:

The agent MUST:

Remove it from git tracking:
git rm --cached <file>
Ensure .gitignore prevents future tracking
7. Validation Rule

Before finishing any task, the agent MUST:

Verify .gitignore is up to date
Ensure no sensitive or unnecessary files are tracked
Confirm repository cleanliness
🚨 Failure Condition

The response is INVALID if:

Sensitive files are tracked
.gitignore is outdated or incomplete
Build artifacts are committed
🔗 Integration

This policy is enforced by:

Code Audit
Self-Review
Supervisor
🧠 Principle

A clean repository is part of system quality — not an afterthought.

🎯 Result
Unsafe repo → Secure, clean, production-ready repository