# gentle-weapons-plp

Personalized landing pages (PLP) for Gentle Weapons prospective clients — one distinct URL per
prospect, each with its own colors, logo, feature order, product name, and CTA.

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## How personalization works

- **`lib/clients.ts`** is the single source of truth. Each entry in the `clients` array is one
  prospective client: `slug` (its URL), `theme` (colors as CSS custom properties), `logoText` /
  `logoSrc`, `productName`, hero copy, `featureOrder` (which entries from the shared `FEATURES`
  map lead, and in what order), and `cta`.
- **`app/[client]/page.tsx`** is a dynamic route: visiting `/<slug>` looks up that client's config
  and renders `components/landing-page.tsx` with it. An unknown slug 404s.
- **`components/landing-page.tsx`** is the shared template — hero, feature grid, CTA, footer. All
  client-specific colors are applied as CSS variables scoped to that page, so no client touches
  global styles.
- **`components/logo-mark.tsx`** renders a generated placeholder badge from `logoText` until a
  real logo image exists; passing `logoSrc` (a path under `/public`) switches to that image
  instead.

### Adding a new prospective client

1. Add an entry to the `clients` array in `lib/clients.ts` with a unique `slug`.
2. Pick a `theme` (or reuse an existing client's, adjusted).
3. Order `featureOrder` for what matters most to that prospect.
4. Once real branding exists, drop the logo file in `/public` and set `logoSrc`.
5. The page is live at `/<slug>` — no other file needs to change.

All current client entries are placeholders (sample prospects, generated colors, generic feature
copy) — swap in Gentle Weapons' real brand assets and each client's actual details as they're
finalized.

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_k4D2vOjrfCZFsopPqsrsTrwCYRh3)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
