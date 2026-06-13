## 2026-06-13 - Add Permissive Content Security Policy (CSP)
**Vulnerability:** The application was lacking a Content Security Policy, making it more vulnerable to XSS and data injection attacks.
**Learning:** Adding security headers to `vite.config.js` only impacts the local development environment and provides zero real-world security benefit. A permissive CSP via `<meta>` tag in `index.html` is the correct approach for Vite SPAs if strict server configurations are unavailable, ensuring both production security and development HMR compatibility.
**Prevention:** Apply CSP through `index.html` meta tags or production server configurations rather than relying on `vite.config.js` `server.headers`.
