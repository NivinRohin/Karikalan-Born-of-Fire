## 2026-05-29 - Missing Content Security Policy (CSP)
**Vulnerability:** The application was missing a Content Security Policy, leaving it vulnerable to XSS attacks.
**Learning:** Adding a strict CSP in a Vite development environment breaks Hot Module Replacement (HMR). The application requires `script-src 'self' 'unsafe-inline'`, `style-src 'self' 'unsafe-inline'`, and `connect-src 'self' ws: wss:` to allow Vite's injected development scripts and WebSocket connections to function properly.
**Prevention:** Always include this Vite-compatible CSP baseline in new HTML templates to establish defense-in-depth against XSS without breaking the developer experience.
