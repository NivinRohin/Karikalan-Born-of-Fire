## 2024-05-03 - Add Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP).
**Learning:** Adding a baseline CSP with `default-src 'self'` provides crucial defense-in-depth against XSS and data injection. To support Vite's Hot Module Replacement (HMR) during local development, directives `script-src`, `style-src` must include `'unsafe-inline'`, and `connect-src` must include `ws: wss:`.
**Prevention:** Always implement a baseline CSP in `index.html` while allowing specific exceptions required by the build tooling (like Vite HMR).
