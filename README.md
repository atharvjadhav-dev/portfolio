# Atharv Jadhav — Cloud & DevOps Engineering Portfolio

**Live Production Site:** [https://atharvjadhav.xyz](https://atharvjadhav.xyz)

A terminal-inspired, GitHub-integrated cloud & DevOps engineering portfolio engineered with **Next.js (Static Export)**, **TypeScript**, and **Tailwind CSS**, deployed on **AWS** using **Amazon S3**, **Amazon CloudFront (OAC)**, **Route 53**, **AWS Certificate Manager (ACM)**, **AWS Lambda**, **Amazon API Gateway**, and **GitHub Actions OIDC CI/CD**.

---

## Architecture Overview

```text
Visitor (HTTPS)
   │
   ▼
Amazon Route 53 (DNS Hosted Zone: atharvjadhav.xyz)
   │
   ├──► Amazon CloudFront CDN (TLS 1.3 via ACM + Origin Access Control)
   │       │
   │       ▼
   │    Amazon S3 Bucket (100% Private Static Origin: s3://atharvjadhav-portfolio-xyz)
   │
   └──► Amazon API Gateway (HTTP API + CORS)
           │
           ▼
        AWS Lambda (Node.js 20 Serverless Contact Handler + CloudWatch Logs)
```

---

## CI/CD Pipeline (GitHub Actions + AWS OIDC)

Every push to the `main` branch automatically triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. **Build & Typecheck (`build-and-validate`):**
   - Installs dependencies (`npm ci`)
   - Validates TypeScript types (`npx tsc --noEmit`)
   - Generates static production bundle (`npm run build` -> `out/`)
2. **Passwordless AWS Authentication (OIDC):**
   - Assumes IAM Role `arn:aws:iam::081897152686:role/github-actions-portfolio-deploy` via `token.actions.githubusercontent.com` without storing long-lived AWS access keys.
3. **Zero-Downtime Deployment (`deploy-aws`):**
   - Syncs `out/` to `s3://atharvjadhav-portfolio-xyz --delete`
   - Packages & updates the `atharv-portfolio-contact` AWS Lambda function (`lambda/index.mjs`)
   - Invalidates the CloudFront edge cache (`/*`) on distribution `E23PAC00CHNLAL`

---

## Local Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build static production export
npm run build
```

## Configuration & Content

All portfolio data is modularized and strongly typed under `src/data/`:
- `src/data/profile.ts` — Personal summary, availability badge, and terminal metadata
- `src/data/skills.ts` — Categorized cloud, container, IaC, Linux/networking, and observability stack
- `src/data/projects.ts` — Featured engineering projects and deep-dive architectural case studies
- `src/data/repos.ts` — Fallback repository metadata for the live GitHub REST API integration
- `src/data/socials.ts` — Contact links andserverless API Gateway endpoint configuration
