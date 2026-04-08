# Development Validation Checklist — Nova Suzuki

This checklist defines the validation criteria for development quality.

It MUST be used during:

- Code reviews
- Feature implementation
- Refactoring
- Pre-delivery validation

---

# 🎯 1. Usage Rule

This checklist MUST be interpreted and enforced by:

- Self-Review policies
- Code Audit policies
- Supervisor agent

---

# 🎨 2. UX / UI

- [ ] Mega-menu does not overflow layout
- [ ] Navigation flows work correctly (e.g., scroll anchors)
- [ ] Brand colors are consistent (#003d7c, #c60f13)
- [ ] CTAs are visible and properly contrasted
- [ ] Animations are natural (< 300ms)

---

# 📱 3. Responsiveness

- [ ] Mobile layout (<768px) is functional
- [ ] Menus adapt correctly (hamburger / drawer)
- [ ] ProductGrid supports touch interactions
- [ ] HeroSection handles small screens properly
- [ ] Layout adapts to Tailwind breakpoints

---

# 🔐 4. Security (LGPD Mapping)

- [ ] Inputs are sanitized (prevent XSS)
- [ ] HTTPS is enforced
- [ ] LGPD.md rules are respected
- [ ] No sensitive data in localStorage
- [ ] Dependencies are safe (npm audit)

---

# ⚡ 5. Performance

- [ ] Images use lazy loading when needed
- [ ] No unnecessary large bundles
- [ ] useEffect cleanup is implemented (no memory leaks)
- [ ] No console errors

---

# ♿ 6. Accessibility (A11Y)

- [ ] Accessible labels (aria, sr-only)
- [ ] Forms have clear labels and descriptions
- [ ] Interactive elements are screen-reader friendly

---

# 🧠 7. Important Notes

- Not all items apply to every task
- Only relevant sections must be validated
- Violations must be handled by policy modules