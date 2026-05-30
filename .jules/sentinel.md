## 2026-05-30 - Baseline Content Security Policy for Vite
**Vulnerability:** Missing Content Security Policy (CSP) headers leaving the application vulnerable to XSS and injection attacks.
**Learning:** A strict CSP can break Vite's Hot Module Replacement (HMR). The 'unsafe-inline' and 'ws: wss:' directives are necessary to prevent XSS vulnerabilities without breaking Vite's HMR and injected inline development scripts.
**Prevention:** Always include a baseline CSP meta tag in Vite projects using these specific directives to balance security and developer experience.
