# gentle-weapons-plp

Personalized landing pages for Gentle Weapons prospective clients — one distinct URL per
prospect, each carrying the gentleweapons.com layout with its own accent color, co-branded
lockup, section order, lead product, and CTA.

Built with [Next.js](https://nextjs.org), bootstrapped with [v0](https://v0.app).

## How it works

- **`lib/clients.ts`** is the single source of truth, split in two:
  - `PRODUCTS` and `PROBLEMS` hold the shared, factual content (GWOS, Poolnet, Poolboy and their
    capability sets). Every page draws from these, so a product fact is corrected in one place.
  - `clients[]` holds the per-prospect personalization: `slug`, `accent`, `clientName` /
    `clientDescriptor`, hero copy, `sectionOrder`, `productOrder`, `problemOrder`, `ctaLabel`,
    and `marquee`.
- **`app/[client]/page.tsx`** is a dynamic route. `/<slug>` looks up the config, renders the
  sections in that client's declared order, and numbers them `§ 02 / 06` … `§ 05 / 06`
  automatically (hero is `§ 01`, contact is `§ 06`). An unknown slug 404s.
- **`components/sections.tsx`** holds the page sections — Hero, Doctrine, Products, Deployment,
  Company, Contact, Footer.
- **`components/gw-ui.tsx`** holds the shared primitives — `Section`, `SectionHead`, `Kicker`,
  `DisplayHeading`, `OffsetButton`, `BracketLink`, `Marquee`, `TerminalPanel`, `Ascii`.
- **`components/site-nav.tsx`** is the sticky co-branded nav. Its tabs follow the client's own
  `sectionOrder`, so the nav always matches the page beneath it.
- **`app/globals.css`** carries the design system: the `--gw-*` palette, display/mono font
  stacks, and the `.noise` / `.scanline` / `.grid-bg` / `.hair` / `.marquee-track` /
  `.hover-invert` effects.

### Routes

Every prospect gets a full site under their own slug, not just one page:

```
/<client>                              landing page
/<client>/platform/<product>           gwos · poolnet · poolboy
/<client>/<guide>                      secure-boot · immutable-linux · signed-ota
                                       deploy-software-to-jetson · mesh-network
                                       fleet-management
/<client>/alternatives/<alternative>   yocto · ubuntu-core · kairos · mender
                                       balena · foundries-io · meshmerize
```

That is 17 pages per client, all statically generated. Guide and alternative
content lives in `lib/subpages.ts` and `ALTERNATIVES` respectively; the
templates are in `components/subpage.tsx`. Each route sets
`dynamicParams = false`, so an unknown slug 404s rather than rendering empty.

### Adding a prospective client

Append an entry to `clients` in `lib/clients.ts`. Nothing else needs to change — the page builds
at `/<slug>` on the next deploy.

```ts
{
  slug: 'acme-robotics',
  clientName: 'Acme Robotics',
  clientDescriptor: 'GROUND ROBOTICS',
  accent: ACCENTS.cyan,          // or any hex
  hero: { rev, headlineTop, headlineBottom, lede, bullets, flag },
  ctaLabel: 'Request_Brief',
  sectionOrder: ['products', 'doctrine', 'deployment', 'company'],
  productOrder: ['gwos', 'poolboy', 'poolnet'],
  problemOrder: ['os-sidequests', 'model-delivery', 'links-degrade'],
  marquee: [...],
}
```

## These pages do not link to gentleweapons.com

Landing pages are self-contained: every action funnels to `#contact`. The nav
logo is deliberately not a link, product cards carry no "guides" links, and the
competitor block links to the CTA rather than to the full comparison page. Keep
it that way when adding sections — the only outbound references are the
`mailto:` addresses, which are the CTA itself.

One exception, and it is a resource request rather than a link a visitor can
click: `app/globals.css` loads the display face from
`https://gentleweapons.com/fonts/unicode.compacta.ttf`. See Notes below.

## Notes

- The display face (`AC Compacta`) is loaded by `@font-face` from
  `https://gentleweapons.com/fonts/unicode.compacta.ttf` rather than vendored here, so this
  public repo does not redistribute a licensed font file. It falls back to Impact / Arial Black.
- **The contact form is not wired to a backend.** Fields render for visual parity and `Transmit`
  opens a prefilled mail draft to `hello@gentleweapons.com`. Point it at a real endpoint before
  sending these URLs to prospects.
- The `* _files/` folders and matching `.html` files at the repo root are saved copies of the
  production site, kept as layout reference. They are not part of the build.
