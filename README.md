# ai-service

Standalone NestJS (TypeScript) service scaffold for Tagmi.

Run locally:
  npm ci
  npm run dev

Build Docker image:
  docker build -t ai-service:latest .

CI/CD configured to push to DigitalOcean Container Registry. Set repo secrets: DOCR_TOKEN, DOCR_REGISTRY, DO_API_TOKEN (optional).
