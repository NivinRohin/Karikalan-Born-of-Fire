## 2025-05-11 - Add Content-Security-Policy (CSP)
**Vulnerability:** Missing Content-Security-Policy in `index.html`.
**Learning:** Vite development server relies on inline scripts and WebSocket connections for HMR. Implementing a strict CSP without `'unsafe-inline'` for scripts/styles or without allowing `ws:` and `wss:` connections breaks local development.
**Prevention:** Implement a baseline CSP that allows `'unsafe-inline'` for development compatibility but still restricts external domains to prevent common XSS vectors.
