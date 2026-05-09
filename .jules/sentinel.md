## 2024-05-09 - Missing Content Security Policy (CSP)
**Vulnerability:** The application lacks a Content Security Policy (CSP), leaving it vulnerable to Cross-Site Scripting (XSS) and data injection attacks.
**Learning:** Vite requires specific directives (`script-src 'unsafe-inline'`, `style-src 'unsafe-inline'`, and `connect-src 'ws:' 'wss:'`) for HMR and inline development scripts to work.
**Prevention:** Always include a baseline CSP via a meta tag in `index.html` with necessary directives for the development framework, and refine for production.
