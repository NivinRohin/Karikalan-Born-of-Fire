## 2024-04-24 - [Adding CSP to Static Vite Apps]
**Vulnerability:** Missing Content Security Policy (CSP) leaving the app vulnerable to XSS and unauthorized resource loading.
**Learning:** In modern dev environments like Vite with React, implementing a strict CSP is challenging because HMR relies on WebSocket connections (`ws:`, `wss:`) and injected inline scripts (`'unsafe-inline'`).
**Prevention:** Always ensure a baseline CSP is included early in `index.html`. For Vite specifically, include `connect-src 'self' ws: wss:;` and `script-src 'self' 'unsafe-inline'` to maintain dev server functionality while still gaining protection against cross-origin data exfiltration.
