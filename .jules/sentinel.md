## 2024-05-07 - Add CSP Header with Vite HMR Compatibility
**Vulnerability:** Missing Content-Security-Policy (CSP) allowed potential Cross-Site Scripting (XSS) risks.
**Learning:** Vite's Hot Module Replacement (HMR) and inline development scripts require 'unsafe-inline' and 'ws: wss:' directives to function correctly without breaking the local dev environment. This is a common pattern in modern frontend tooling that needs balancing with strict security policies.
**Prevention:** Ensure baseline CSP includes 'unsafe-inline' and WebSocket connections ('ws: wss:') in development environments, and consider stricter policies or nonces for production deployments if possible.
