## 2026-05-26 - Baseline Content Security Policy for Vite
**Vulnerability:** Missing baseline Content Security Policy in index.html exposing the application to XSS vulnerabilities.
**Learning:** The project implements a baseline CSP that requires 'unsafe-inline' and 'ws: wss:' directives to prevent XSS without breaking Vite's Hot Module Replacement (HMR).
**Prevention:** Always include the baseline CSP meta tag with these specific directives in index.html for Vite React apps.
