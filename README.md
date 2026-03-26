# EduLense — Web Application

A responsive, mobile-first educational productivity PWA built with React, TypeScript, Vite, and Tailwind CSS.

## Live Deployment

https://2026springnew.vercel.app

## Tech Stack

- React 19 + TypeScript
- Vite 8
- React Router v6 (lazy-loaded routes)
- Zustand (state management)
- Tailwind CSS
- Vitest + React Testing Library (unit/RTL tests)
- Playwright (E2E tests)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
git clone https://github.com/umgc/2026_spring.git
cd 2026_spring
git checkout developer
npm install
npm run dev
```

App runs at http://localhost:5173

## Testing

### Unit & RTL Tests

```bash
npm test
```

### Coverage Report (91%+)

```bash
npm run test:Coverage
```

HTML report generated in `coverage/lcov-report/index.html`

### E2E Tests (Playwright)

```bash
npx playwright install
npm run test:e2e
```

Runs 4 critical user flows across Chrome, Firefox, and Safari.

## Build & Deploy

### Production Build

```bash
npm run build
```

Output in `dist/`

### Deploy to Vercel

The `vercel.json` in the project root configures automatic deployment.
Connect the repository to Vercel and it deploys on every push to `developer`.

## PWA

The app is installable as a PWA from the deployed URL.
Service worker provides offline support for cached routes.
