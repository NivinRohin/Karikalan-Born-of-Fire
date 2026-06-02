## 2026-06-02 - Added Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) allowed potential Cross-Site Scripting (XSS).
**Learning:** Adding a CSP prevents unauthorized script execution. In Vite, 'unsafe-inline' and 'ws: wss:' are required to support Hot Module Replacement (HMR) during development.
**Prevention:** Always implement a baseline CSP in new web projects.
