## 2026-06-03 - Vite Content Security Policy (CSP) Requirements
**Vulnerability:** Missing baseline Content Security Policy leaving the application vulnerable to XSS.
**Learning:** When implementing CSP in a Vite-based project, the `unsafe-inline` directive for scripts/styles and `ws: wss:` for connections are necessary to maintain Vite's Hot Module Replacement (HMR) and inline development scripts functionality without breaking the dev environment.
**Prevention:** Ensure any future CSP updates or new index files in this project retain these specific directives to balance security with development functionality.
