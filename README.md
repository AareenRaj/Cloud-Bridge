# CloudBridge

A specialized hub connecting **Cloud FinOps and cloud-architecture engineers**
with **venture-backed scaleups** that want to reduce their AWS and Google Cloud bills.

> Status: working prototype running on sample data. No real experts, companies or payments yet.

## Features

- Search and filter cloud experts by skill, platform and hourly rate
- Detailed expert profiles with skills, certifications and savings delivered
- Project listings with detail pages and suggested expert matches
- "Post a project" and "Join as expert" forms with validation
- Interactive cloud savings estimator
- How it works and FAQ sections
- Accessible, responsive layout with reusable components

## Tech stack

- [Next.js](https://nextjs.org) (App Router) and TypeScript
- Tailwind CSS
- Sample data stored in `src/data`

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```text
src/
  app/          Pages and routes
  components/   Reusable UI (Button, Card, Badge, forms, sections)
  data/         Sample experts and projects
  types.ts      Shared TypeScript types
```

## Roadmap

- [x] Branding, shared layout and design tokens
- [x] Reusable components and typed data
- [x] Expert search, filters, profiles and project pages
- [x] Project and expert forms with validation
- [x] Savings estimator, how it works and FAQ
- [ ] Database and authentication
- [ ] Saving form submissions and intro requests
- [ ] Tests, SEO and deployment

## Note

All people, companies, rates and savings figures in this repository are made-up sample data.