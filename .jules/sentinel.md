## 2026-06-01 - Content Security Policy for Vite
**Vulnerability:** Missing Content Security Policy (CSP).
**Learning:** Adding a baseline CSP in Vite requires 'unsafe-inline' for styles/scripts and ws: wss: for connect-src to prevent breaking Vite's Hot Module Replacement (HMR) and injected inline development scripts.
**Prevention:** Always include a CSP meta tag with HMR-compatible directives in Vite projects from the start.
