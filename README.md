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

## The prospect list is real — treat it accordingly

The five companies in `lib/clients.ts` are real Series A defense-autonomy companies, chosen
as ideal-fit prospects. Each entry carries its `round` (latest priced round as publicly
announced) and a one-line `fit`. The contacts in `lib/prospects.ts` are founders and C-level
publicly named in those companies' own funding announcements, each with a `source` URL. Nothing
was scraped or guessed.

Two rules follow from that:

- **Verify before sending.** Rounds close and people move. Round data and titles were checked
  in September 2026.
- **No invented logos on real companies.** Real prospects get a neutral monogram from
  `ClientLogo` until a real logo is supplied via `clientLogoSrc`. The generated `logoMark`
  shapes are for hypothetical demo companies only.

Every page sets `robots: noindex, nofollow` in `app/layout.tsx` — these are meant to be sent
as links, not found by search.

The `competitor` on each client is an informed assumption from what the company ships
publicly, not confirmed. Treat it as a conversation opener. The same goes for `painPoints`:
written from each company's public product descriptions, and the doctrine section says so.

Links and logos on the index:

- **Names link to LinkedIn.** A verified profile URL only where one was found as a
  linkedin.com result for that exact person and company (`linkedinVerified: true`, shown as
  `in ↗`). Otherwise a LinkedIn people search for name + company (`search ↗`). No profile
  slug is guessed — a wrong one would send a prospect's link to a stranger.
- **Company names link to `website`.** Only on the index. Landing pages stay a closed funnel.
- **Logos are the companies' own favicons**, loaded in the visitor's browser from a favicon
  service via `ClientLogo`, with the monogram as a fallback if the fetch fails. To use a
  proper logo file instead, drop it in `/public/logos/` and set `clientLogoSrc` — it takes
  precedence. These marks identify the company; they do not imply any relationship.
- **Colors follow the production site, not the prospect.** Product elements use the site's own
  product colors from `PRODUCT_COLORS` — GWOS green, Poolnet blue, Poolboy gold — wherever a
  product is shown. Everything else uses the site's green (`accent`, the same for every client)
  and white, exactly as the original homepage does. There is no per-client brand color. On the
  index, each company card is keyed to the color of its lead product.

## Notes

- The display face (`AC Compacta`) is loaded by `@font-face` from
  `https://gentleweapons.com/fonts/unicode.compacta.ttf` rather than vendored here, so this
  public repo does not redistribute a licensed font file. It falls back to Impact / Arial Black.
- **The contact form is not wired to a backend.** Fields render for visual parity and `Transmit`
  opens a prefilled mail draft to `hello@gentleweapons.com`. Point it at a real endpoint before
  sending these URLs to prospects.
- The `* _files/` folders and matching `.html` files at the repo root are saved copies of the
  production site, kept as layout reference. They are not part of the build.
