## 2026-05-23 - Baseline Content Security Policy for Vite
**Vulnerability:** Missing Content Security Policy (CSP) headers, allowing potential XSS and data injection attacks.
**Learning:** Adding a basic CSP via meta tag is an effective defense-in-depth strategy. However, Vite's development server (HMR) and injected inline development scripts require specific directives to function properly.
**Prevention:** Always include `script-src 'self' 'unsafe-inline'` and `style-src 'self' 'unsafe-inline'` to prevent breaking Vite's HMR and injected styles. Also, include `connect-src 'self' ws: wss:` to allow WebSocket connections for HMR.
