## 2024-05-24 - [Vite Project Default CSP]
**Vulnerability:** Missing Content-Security-Policy header in Vite built web apps
**Learning:** For React applications using Vite (and React Three Fiber), the default `index.html` often lacks a CSP. However, adding one blindly will break Vite's development server due to its use of inline scripts for Hot Module Replacement (HMR).
**Prevention:** Always implement a baseline CSP in `index.html` with `<meta http-equiv="Content-Security-Policy">`. Crucially, when working with Vite, ensure the policy includes `script-src 'self' 'unsafe-inline'` and `connect-src 'self' ws: wss:` to permit HMR and local injected scripts while blocking external malicious sources.
