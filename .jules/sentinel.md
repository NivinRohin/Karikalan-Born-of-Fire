## 2023-10-27 - [HIGH] Fix missing Content Security Policy (CSP)
**Vulnerability:** Missing Content Security Policy (CSP) headers in a Vite React app, exposing the application to Cross-Site Scripting (XSS) risks.
**Learning:** Vite relies on Hot Module Replacement (HMR) and inline scripts for development. A strict CSP without `script-src 'unsafe-inline'` and `connect-src ws: wss:` will break the Vite dev server and HMR.
**Prevention:** Always implement a baseline CSP in `index.html` as early as possible. Use `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' ws: wss:;` as a starting point for Vite applications to balance security and developer experience.
