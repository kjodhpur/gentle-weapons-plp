/**
 * Content model for personalized Gentle Weapons landing pages.
 *
 * Shared, factual product data lives in PRODUCTS and PROBLEMS — every client
 * page draws from the same source of truth. Per-prospect personalization is
 * expressed entirely in ClientConfig: URL, accent color, co-branded lockup,
 * section order, which product leads, and the CTA.
 */

/**
 * Generated marks for hypothetical demo companies only. Real prospects omit
 * `logoMark` and get a neutral monogram — never a made-up logo on a real name.
 */
export type LogoMark = 'delta' | 'hull' | 'meridian'

export type ProductKey = 'gwos' | 'poolnet' | 'poolboy'
export type ProblemKey = 'os-sidequests' | 'links-degrade' | 'model-delivery'
export type SectionKey = 'doctrine' | 'products' | 'deployment' | 'company'

export type Product = {
  key: ProductKey
  name: string
  /** Category pill, e.g. "PLATFORM · LINUX" */
  category: string
  readiness: string
  headline: string
  body: string
  capabilities: string[]
}

export const PRODUCTS: Record<ProductKey, Product> = {
  gwos: {
    key: 'gwos',
    name: 'GWOS',
    category: 'PLATFORM · LINUX',
    readiness: 'READINESS: TRL-4',
    headline: 'A Linux distribution purpose-built to run AI workloads in production.',
    body: 'Takes the NVIDIA Jetson family from developer kit to fielded, attestable compute — immutable rootfs, A/B updates, signed OTA, and a kernel you can actually pin.',
    capabilities: [
      'Immutable, attested rootfs · A/B partitions · atomic rollback',
      'Pinned CUDA / TensorRT / cuDNN stack · kernel locked versioning',
      'Signed OTA with delta updates over low-bandwidth links',
      'TPM-backed boot, secure-element device identity, SBOM per image',
      'FIPS 140-3 cryptographic track, CMMC L2 alignment roadmap',
    ],
  },
  poolnet: {
    key: 'poolnet',
    name: 'Poolnet',
    category: 'NETWORK · EDGE_MESH',
    readiness: 'READINESS: TRL-4',
    headline: 'An edge-first private mesh. Self-forming, encrypted, egress-optional.',
    body: 'What an autonomy fleet talks over when LTE is jammed, satcom is degraded, and the nearest server is three valleys away. Forms itself, heals itself, needs no horizon.',
    capabilities: [
      'Quantum-safe encrypted links · per-node keypairs · short-lived certs',
      'Partition-tolerant · continues operating without backhaul',
      'Policy-driven egress · optionally tethered to cloud',
      'Operator-in-the-loop ACLs · audit trail · time-boxed access',
    ],
  },
  poolboy: {
    key: 'poolboy',
    name: 'Poolboy',
    category: 'DEPLOYMENT · CONTROL_PLANE',
    readiness: 'READINESS: TRL-4',
    headline: 'A deployment system for next-gen AI workloads on autonomous platforms.',
    body: 'Modern devops for shipping models and binaries to robots, UAS, and ground vehicles already in test and field deployment — with a rollback plan that works when the link does not.',
    capabilities: [
      'Fleet-scale rollouts · canary / wave / region targeting',
      'Cryptographically signed, per-node acknowledged deploys',
      'Atomic rollback to last-known-good on telemetry breach',
      'Bandwidth-aware · resumable · works over intermittent links',
      'Human-authorized go/no-go gates · multi-operator control',
    ],
  },
}

export type Problem = {
  key: ProblemKey
  label: string
  title: string
  body: string
}

export const PROBLEMS: Record<ProblemKey, Problem> = {
  'os-sidequests': {
    key: 'os-sidequests',
    label: 'PROBLEM_01 — OBSERVED',
    title: 'OS sidequests suck.',
    body: 'Model weights are easy. The platform underneath is where programs die — kernel drift, CUDA breakage, unsigned updates, no rollback.',
  },
  'links-degrade': {
    key: 'links-degrade',
    label: 'PROBLEM_02 — OBSERVED',
    title: 'Links degrade. Missions do not pause.',
    body: 'EW, jamming, tethered ops, LEO gaps. Cloud-trained autonomy has no path home. The mesh has to form and heal itself, securely, without a horizon.',
  },
  'model-delivery': {
    key: 'model-delivery',
    label: 'PROBLEM_03 — OBSERVED',
    title: 'Getting models onto field systems is the hard part.',
    body: 'Shipping AI to 200 robots is not a kubectl apply. It is firmware, weights, sensors, calibration, radios, OTA, and a rollback plan that holds under contact.',
  },
}

export type AlternativeKey =
  | 'yocto'
  | 'ubuntu-core'
  | 'kairos'
  | 'mender'
  | 'balena'
  | 'foundries-io'
  | 'meshmerize'

export type Alternative = {
  key: AlternativeKey
  /** Which product the comparison argues for. */
  product: ProductKey
  /** Headline label, e.g. "VS YOCTO / OPENEMBEDDED". */
  vs: string
  /** The counter-argument headline. */
  counter: string
  /** The switch case, as [ OK ] rows. */
  points: string[]
}

/**
 * Competitor comparisons, mirroring the /alternatives/* pages. A client page
 * renders one of these when its config names the stack that prospect already
 * runs, so the page argues against their actual incumbent.
 */
export const ALTERNATIVES: Record<AlternativeKey, Alternative> = {
  yocto: {
    key: 'yocto',
    product: 'gwos',
    vs: 'VS YOCTO / OPENEMBEDDED',
    counter: 'Control without the layer tax',
    points: [
      'Pre-integrated Jetson production image — not a from-scratch layer stack',
      'Signed OTA and A/B rollback included',
      'SBOM generation aligned to procurement review',
      'Optional integration with Poolboy fleet rollout',
    ],
  },
  'ubuntu-core': {
    key: 'ubuntu-core',
    product: 'gwos',
    vs: 'VS UBUNTU CORE',
    counter: 'Where teams look beyond Ubuntu Core',
    points: [
      'Jetson-first image with kernel-locked NVIDIA JetPack stack',
      'Signed OTA with A/B rollback — not just package confinement',
      'SBOM and attestation metadata per production image',
      'Interlocks with Poolboy payload rollout and Poolnet mesh',
    ],
  },
  kairos: {
    key: 'kairos',
    product: 'gwos',
    vs: 'VS KAIROS',
    counter: 'Immutable OS where you field inference',
    points: [
      'Immutable rootfs with A/B updates on Jetson hardware',
      'Pinned NVIDIA JetPack components per image',
      'Attested boot and SBOM for procurement review',
      'Stack integration for mesh and payload rollout',
    ],
  },
  mender: {
    key: 'mender',
    product: 'poolboy',
    vs: 'VS MENDER',
    counter: 'OTA plus payload fleet control',
    points: [
      'GWOS handles Jetson OS image OTA with A/B rollback',
      'Poolboy handles payload fleet waves and per-node ack',
      'Poolnet delivers both when backhaul is unavailable',
      'Human-authorized rollout gates for operational safety',
    ],
  },
  balena: {
    key: 'balena',
    product: 'poolboy',
    vs: 'VS BALENA',
    counter: 'Fleet deploy beyond container push',
    points: [
      'Signed payload manifests with per-node acknowledgment',
      'GWOS immutable Jetson images with A/B OS rollback',
      'Poolnet delivery when cloud fleet backhaul is degraded',
      'Human-authorized rollout waves for operational safety',
    ],
  },
  'foundries-io': {
    key: 'foundries-io',
    product: 'poolboy',
    vs: 'VS FOUNDRIES.IO',
    counter: 'Platform OTA plus payload orchestration',
    points: [
      'Separate OS and payload rollout planes that interlock',
      'Delivery over encrypted mesh when backhaul is absent',
      'Human-authorized go/no-go gates for field operations',
      'Rollback to last-known-good on telemetry breach',
    ],
  },
  meshmerize: {
    key: 'meshmerize',
    product: 'poolnet',
    vs: 'VS MESHMERIZE',
    counter: 'Mesh built for contested edge',
    points: [
      'Encrypted peer mesh with optional tethered egress',
      'Partition healing without mandatory backhaul',
      'Operator ACLs and time-boxed access',
      'Shared stack with signed OTA and OS attestation',
    ],
  },
}

/**
 * Product colors, exactly as the production site assigns them: GWOS green,
 * Poolnet blue, Poolboy gold. Product cards and product sub-pages use these.
 */
export const PRODUCT_COLORS: Record<ProductKey, string> = {
  gwos: '#00ff88',
  poolnet: '#00e5ff',
  poolboy: '#ffb000',
}

/** Accent options, matching the production palette. */
export const ACCENTS = {
  phosphor: '#00ff88',
  cyan: '#00e5ff',
  amber: '#ffb000',
  redact: '#ff3b3b',
  bone: '#e6e6e6',
} as const

export type ClientConfig = {
  /** Distinct URL: the page renders at /<slug>. */
  slug: string
  clientName: string
  /** Sits under the co-branded lockup, e.g. "GPS-DENIED NAVIGATION". */
  clientDescriptor: string
  /**
   * Page accent for section kickers, doctrine rules, and the hero flag. The
   * production site uses its green everywhere outside the product cards, so
   * this stays ACCENTS.phosphor for every client; product cards take their
   * own color from PRODUCT_COLORS. Not a per-client brand color.
   */
  accent: string
  /** Optional real client logo under /public. Takes precedence over everything. */
  clientLogoSrc?: string
  /** Generated mark — for hypothetical demo companies only. Omit for real prospects. */
  logoMark?: LogoMark

  /**
   * Latest priced round, as publicly announced. Shown on the index so the
   * list can be re-checked against the "Series A" filter as rounds move.
   */
  round: string
  /** One line on why this company is a fit — shown on the index. */
  fit: string
  /**
   * The company's site. Drives the outbound link on the index and, via
   * ClientLogo, the company's own favicon in the co-branded lockup.
   */
  website: string
  /**
   * Pain points written for this prospect, from what they ship publicly.
   * When present they replace the shared PROBLEMS in the doctrine section,
   * labelled "OBSERVED AT <COMPANY>". Three reads best.
   */
  painPoints?: { title: string; body: string }[]
  /** One line per product on what it means for this company, on each product card. */
  productNotes: Record<ProductKey, string>
  /** Maps the ORIGIN → DISTRIBUTION → EDGE schematic onto this company's operation. */
  deploymentNote: string

  hero: {
    rev: string
    headlineTop: string
    headlineBottom: string
    lede: string
    /** Paragraph under the lede, written for this company's situation. */
    context: string
    bullets: string[]
    /** Highlighted closing fragment on the last bullet. */
    flag: string
  }

  /** CTA label, e.g. Request_Brief / Request_Access / Request_Full_Spec. */
  ctaLabel: string
  /** Order of the main sections down the page. */
  sectionOrder: SectionKey[]
  /** Which product leads the systems manifest. */
  productOrder: ProductKey[]
  /** Which problems lead the doctrine section. */
  problemOrder: ProblemKey[]
  /** Ticker items under the hero. */
  marquee: string[]
  /**
   * The stack this prospect runs today. When set, the page renders the
   * matching comparison directly after the products section. Omit it and
   * that section simply does not appear.
   *
   * For the companies below this is an informed assumption from what they
   * ship publicly, not confirmed — treat it as a conversation opener.
   */
  competitor?: AlternativeKey
}

/**
 * Real Series A defense-autonomy companies selected as ideal-fit prospects.
 * Company facts and round data come from each company's own funding
 * announcements as of September 2026; verify before sending, as rounds move.
 */
export const clients: ClientConfig[] = [
  {
    slug: 'scout-ai',
    clientName: 'Scout AI',
    clientDescriptor: 'PHYSICAL AI · UNMANNED WARFARE',
    accent: ACCENTS.phosphor,
    round: 'Series A · $100M · Apr 2026',
    website: 'https://scoutco.ai',
    productNotes: {
      gwos: 'Fury runs on whatever chassis a partner brings. GWOS gives every one of them the same pinned CUDA and TensorRT stack, so an eval result on the G01 means something on the next vehicle.',
      poolnet:
        'Fury is built for degraded comms. Poolnet is the link it uses when there is no link home — the rollout, the telemetry, and operator reach all ride the same mesh.',
      poolboy:
        'Every new Fury checkpoint is a fleet rollout. Poolboy makes it canary → wave → fleet: signed, per-node acknowledged, and reversible on telemetry.',
    },
    deploymentNote:
      'For Scout AI: ORIGIN is the model team shipping a checkpoint. DISTRIBUTION is Poolboy over Poolnet to a mixed fleet. EDGE is Fury running on GWOS on each vehicle.',
    fit: 'Fury is one model shipped to mixed UGV and UAS fleets, at the edge, in degraded comms — the exact rollout problem Poolboy and Poolnet exist for.',
    painPoints: [
      {
        title: 'One model, many chassis.',
        body: 'Fury is hardware-agnostic by design, so every partner UGV and airframe arrives with its own JetPack and CUDA state. A checkpoint validated on the G01 is not guaranteed to behave the same on the next platform unless the stack beneath it is pinned.',
      },
      {
        title: 'Rollouts to a mixed fleet in degraded comms.',
        body: 'Shipping a new checkpoint to a fleet built to operate without a link home means resumable, signed delivery with per-node acknowledgement — and a rollback that fires on telemetry, not on an operator noticing.',
      },
      {
        title: 'Program scrutiny arrives before the platform team does.',
        body: 'Army autonomy work brings SBOM, attestation, and CMMC questions to a company still measured in dozens of engineers. Answering them with a hardened base image is faster than building one.',
      },
    ],
    hero: {
      rev: 'REV 2026.09',
      headlineTop: 'The model is trained.',
      headlineBottom: 'Now ship it to the fleet.',
      lede: 'Signed model delivery for Fury across mixed ground and air fleets — in degraded comms, with a rollback that holds.',
      context:
        'Fury is moving from demonstrations to fleets: mixed UGV and UAS, Army program work, and a $100M Series A to scale it. The platform layer beneath the model is where that scale either holds or leaks. This page is about that layer.',
      bullets: [
        'Poolboy ships weights and binaries to every platform Fury runs on, with per-node acknowledgement.',
        'GWOS pins CUDA and TensorRT so the checkpoint that passed eval is the one that runs.',
        'Poolnet carries the rollout when the link home is gone.',
      ],
      flag: '[ CONTACT FOR BRIEFING ]',
    },
    ctaLabel: 'Request_Access',
    sectionOrder: ['products', 'deployment', 'doctrine', 'company'],
    productOrder: ['poolboy', 'gwos', 'poolnet'],
    problemOrder: ['model-delivery', 'os-sidequests', 'links-degrade'],
    marquee: [
      '// MIXED FLEET · UGV + UAS',
      'SIGNED_MODEL_DELIVERY',
      'CANARY → WAVE → FLEET',
      'DEGRADED_COMMS',
      'PINNED CUDA / TENSORRT',
      'LKG_ROLLBACK',
    ],
    competitor: 'balena',
  },
  {
    slug: 'vermeer',
    clientName: 'Vermeer',
    clientDescriptor: 'GPS-DENIED NAVIGATION',
    accent: ACCENTS.phosphor,
    round: 'Series A · $10M · Oct 2025',
    website: 'https://www.getvermeer.com',
    productNotes: {
      gwos: 'The NVIDIA box in each airframe becomes an immutable, attested image with A/B rollback — the VPS pipeline that was qualified is the one that flies.',
      poolnet:
        'Where aircraft return to a forward site with no backhaul, Poolnet gives ground crews a secure path to push maps and pull logs without a horizon link.',
      poolboy:
        'Terrain databases and matching models are large. Poolboy delivers them as signed, delta, resumable rollouts sized for the link that is actually available.',
    },
    deploymentNote:
      'For Vermeer: ORIGIN is the map and model build. DISTRIBUTION is delta delivery over whatever link the forward site has. EDGE is the VPS processor in the aircraft, attested at boot.',
    fit: 'VPS already runs on an NVIDIA edge processor inside every equipped airframe, under electronic attack in Ukraine. That box needs a signed, immutable, updatable image — which is GWOS.',
    painPoints: [
      {
        title: 'An NVIDIA box in every airframe, many of them under attack.',
        body: 'VPS puts an edge processor and a terrain database on each aircraft. In Ukraine those aircraft update over bad links, under electronic attack, and rarely come back to a bench. The image on that box has to be immutable, signed, and able to recover on its own.',
      },
      {
        title: 'Maps and models are big. Links are not.',
        body: '3D terrain databases and updated matching models are large payloads. Delivery has to be delta, resumable, and bandwidth-aware, or it does not finish before the next sortie.',
      },
      {
        title: 'Primes ask for attestation.',
        body: 'Deployment alongside Lockheed Martin and Northrop Grumman means SBOM per image, attested boot, and a kernel that does not drift between what was qualified and what is flying.',
      },
    ],
    hero: {
      rev: 'REV 2026.09',
      headlineTop: 'Passive in the air.',
      headlineBottom: 'Attested on the ground.',
      lede: 'A signed, immutable image for the NVIDIA edge processor inside every VPS-equipped airframe.',
      context:
        'VPS is fielded — under electronic attack in Ukraine and alongside Lockheed Martin and Northrop Grumman. Every equipped airframe carries an NVIDIA edge processor and a terrain database. That fleet of boxes is what this page is about.',
      bullets: [
        'GWOS locks the JetPack stack so a map-matching pipeline behaves identically across the fleet.',
        'Signed delta OTA for terrain-map and model updates over low-bandwidth links.',
        'Attested boot and SBOM per image — what primes ask for on the path to procurement.',
      ],
      flag: '[ CONTACT FOR BRIEFING ]',
    },
    ctaLabel: 'Request_Access',
    sectionOrder: ['products', 'doctrine', 'deployment', 'company'],
    productOrder: ['gwos', 'poolboy', 'poolnet'],
    problemOrder: ['os-sidequests', 'model-delivery', 'links-degrade'],
    marquee: [
      '// NVIDIA EDGE PROCESSOR',
      'GPS_DENIED',
      'EO / IR PASSIVE',
      'IMMUTABLE_ROOTFS',
      'SIGNED_DELTA_OTA',
      'SBOM / ATTESTED BOOT',
    ],
    competitor: 'yocto',
  },
  {
    slug: 'blue-water-autonomy',
    clientName: 'Blue Water Autonomy',
    clientDescriptor: 'AUTONOMOUS SHIPS',
    accent: ACCENTS.phosphor,
    round: 'Series A · $50M · Aug 2025',
    website: 'https://www.blw.ai',
    productNotes: {
      gwos: "A ship's compute gets an immutable base with A/B partitions: an update that fails at sea reverts on its own, with no one aboard and no recovery sortie.",
      poolnet:
        'Satcom degrades. Poolnet keeps operators reachable through it — policy-driven egress, encrypted, and tolerant of the link dropping for hours.',
      poolboy:
        'As the fleet grows past the first hull, Poolboy stages rollouts in waves with human go/no-go gates, so a bad update never reaches every vessel at once.',
    },
    deploymentNote:
      'For Blue Water Autonomy: ORIGIN is the operations center ashore. DISTRIBUTION is Poolboy over degraded satcom. EDGE is a hull hundreds of miles out with nobody aboard.',
    fit: 'A vessel operating on the open ocean for months is DDIL by definition, with no one aboard to recover a bad update. Signed OTA and no-brick rollback are the whole problem.',
    painPoints: [
      {
        title: 'Months on station, nobody aboard.',
        body: 'An update that fails on a vessel at sea is a lost vessel until a recovery crew reaches it. A/B partitions and automatic rollback to last-known-good turn that into a non-event.',
      },
      {
        title: 'Satcom is the only link, and it degrades.',
        body: 'Operators still need to reach the ship when the backhaul is intermittent. A self-forming mesh with policy-driven egress keeps a path open without depending on the horizon.',
      },
      {
        title: 'The first vessel is one. The fleet is many.',
        body: 'With the first autonomous ship launching in 2026, the rollout model has to be set now: staged waves, human go/no-go gates, and the SBOM and attestation the Navy will ask for.',
      },
    ],
    hero: {
      rev: 'REV 2026.09',
      headlineTop: 'Months at sea.',
      headlineBottom: 'No one aboard to reboot it.',
      lede: 'Signed OTA and last-known-good rollback for a vessel that cannot be recovered by hand.',
      context:
        'The first full-sized autonomous ship launches in 2026, with the Navy already contracting for deep-ocean survey work. A vessel on station for months is the hardest OTA target there is. This page is written for that vessel.',
      bullets: [
        'A/B images with atomic rollback — an update that fails at sea reverts on its own.',
        'Poolnet keeps operators reachable over degraded satcom, egress optional.',
        'Poolboy stages rollouts across the fleet with human go/no-go gates.',
      ],
      flag: '[ CONTACT FOR BRIEFING ]',
    },
    ctaLabel: 'Request_Brief',
    sectionOrder: ['deployment', 'products', 'doctrine', 'company'],
    productOrder: ['gwos', 'poolnet', 'poolboy'],
    problemOrder: ['links-degrade', 'os-sidequests', 'model-delivery'],
    marquee: [
      '// OPEN OCEAN · MONTHS ON STATION',
      'DDIL_BY_DEFINITION',
      'NO-BRICK ROLLBACK',
      'DEGRADED_SATCOM',
      'SIGNED_OTA',
      'UNMANNED · UNRECOVERABLE',
    ],
    competitor: 'mender',
  },
  {
    slug: 'cx2',
    clientName: 'CX2',
    clientDescriptor: 'ELECTRONIC WARFARE',
    accent: ACCENTS.phosphor,
    round: 'Series A · $31M · May 2025',
    website: 'https://www.cx2.com',
    productNotes: {
      gwos: 'Attritable units are re-provisioned constantly. A signed, immutable GWOS image with per-node identity means a replacement unit is trusted and current the moment it boots.',
      poolnet:
        "Poolnet is a mesh built to survive the same jamming CX2's systems operate in — self-forming, egress optional, with short-lived certs that fit a fleet that churns.",
      poolboy:
        'EW models change with the signals they face. Poolboy ships them to fielded units in days, signed and per-node acknowledged, with rollback when a model regresses.',
    },
    deploymentNote:
      'For CX2: ORIGIN is the signals and ML team. DISTRIBUTION is Poolboy across a self-healing Poolnet mesh in contested spectrum. EDGE is an attritable node that may be replaced next week.',
    fit: 'Attritable, ML-powered EW systems at the tactical edge live inside the fight for the spectrum. Their update path and their comms have to survive the same jamming they are built to win.',
    painPoints: [
      {
        title: 'Attritable means many, cheap, and replaced often.',
        body: 'A fleet expected to be lost and re-provisioned needs per-node identity, short-lived certificates, and signed images a new unit can take on without a depot visit.',
      },
      {
        title: 'Your comms live in the spectrum you are fighting in.',
        body: 'EW systems at the tactical edge cannot assume a clean link. The mesh they update and coordinate over has to form and heal itself inside the same contested spectrum.',
      },
      {
        title: 'Models on EW hardware change faster than a depot cycle.',
        body: 'Signals evolve, so the ML that classifies and targets them has to ship to fielded units on a cadence of days — with per-node acknowledgement and a rollback when a model regresses.',
      },
    ],
    hero: {
      rev: 'REV 2026.09',
      headlineTop: 'The spectrum is contested.',
      headlineBottom: 'So is your update path.',
      lede: 'Encrypted mesh and signed delivery for attritable EW systems operating inside a contested spectrum.',
      context:
        'CX2 builds attritable, ML-powered electronic warfare for the tactical edge — systems meant to be numerous, replaceable, and operating inside contested spectrum. The update and comms path for that fleet is what this page addresses.',
      bullets: [
        'Poolnet forms and heals without backhaul — quantum-safe links, short-lived certs.',
        'Signed, per-node-acknowledged rollouts for ML models on attritable hardware.',
        'ITAR-aware supply chain and SBOM per image for the procurement conversation.',
      ],
      flag: '[ CONTACT FOR BRIEFING ]',
    },
    ctaLabel: 'Request_Full_Spec',
    sectionOrder: ['doctrine', 'products', 'deployment', 'company'],
    productOrder: ['poolnet', 'poolboy', 'gwos'],
    problemOrder: ['links-degrade', 'model-delivery', 'os-sidequests'],
    marquee: [
      '// CONTESTED SPECTRUM',
      'EW / JAMMING TOLERANT',
      'ATTRITABLE_EDGE',
      'SELF-HEALING MESH',
      'SIGNED_ROLLOUTS',
      'ITAR_AWARE_SUPPLY_CHAIN',
    ],
    competitor: 'meshmerize',
  },
  {
    slug: 'picogrid',
    clientName: 'Picogrid',
    clientDescriptor: 'DEFENSE INTEGRATION LAYER',
    accent: ACCENTS.phosphor,
    round: 'Series A · $45M · May 2026',
    website: 'https://picogrid.com',
    productNotes: {
      gwos: 'Each fielded Picogrid node gets the same immutable, attested base image, so 100+ integrations do not become 100+ configuration drifts.',
      poolnet:
        "For sites with no clean backhaul, Poolnet gives nodes a secure, self-forming path to each other and to operators without waiting on the customer's network.",
      poolboy:
        'Rollouts across programs and countries need region targeting and resumable delivery. Poolboy gives every node a signed, acknowledged, reversible update path.',
    },
    deploymentNote:
      'For Picogrid: ORIGIN is the platform team. DISTRIBUTION is Poolboy targeting by program and region. EDGE is a Picogrid node on a customer site that may not have been touched in months.',
    fit: 'Hardware-enabled software connecting 100+ military systems means edge nodes fielded at scale. Every one of them needs a hardened base and a fleet-wide, signed update path.',
    painPoints: [
      {
        title: '100+ integrations means 100+ ways for edge configs to drift.',
        body: 'An integration layer is only as consistent as the nodes it runs on. An immutable, attested base image means every fielded node runs the same verified bits, wherever it was provisioned.',
      },
      {
        title: 'Deployed with the Pentagon, NATO, and allies. No two sites update alike.',
        body: 'Rollouts to a node fleet spread across programs and countries need region targeting, bandwidth-aware resumable delivery, and last-known-good rollback per node.',
      },
      {
        title: 'Integration deployments get program review.',
        body: 'Sitting between a customer’s sensors and their C2 puts the platform in scope for SBOM, attestation, and CMMC questions. A hardened base with those answers built in shortens the review.',
      },
    ],
    hero: {
      rev: 'REV 2026.09',
      headlineTop: 'A hundred systems integrated.',
      headlineBottom: 'One hardened base beneath.',
      lede: 'A hardened, attestable base image and fleet-wide signed OTA for the edge hardware that carries an integration layer into the field.',
      context:
        "Picogrid's integration layer already connects 100+ military systems across Pentagon, NATO, and allied programs, and the $45M Series A is about scaling deployments. Every deployment puts more edge hardware in the field. This page is about that hardware.",
      bullets: [
        'GWOS gives every fielded node an immutable, attested rootfs with A/B rollback.',
        'Poolboy rolls out to the node fleet in waves — canary first, per-node ack, LKG rollback.',
        'CMMC L2 roadmap and SBOM per image, so integration deployments clear program review.',
      ],
      flag: '[ CONTACT FOR BRIEFING ]',
    },
    ctaLabel: 'Request_Brief',
    sectionOrder: ['products', 'deployment', 'doctrine', 'company'],
    productOrder: ['gwos', 'poolboy', 'poolnet'],
    problemOrder: ['os-sidequests', 'model-delivery', 'links-degrade'],
    marquee: [
      '// 100+ SYSTEMS INTEGRATED',
      'FIELDED_EDGE_NODES',
      'IMMUTABLE_ROOTFS',
      'FLEET_WAVE_ROLLOUT',
      'CMMC L2 ROADMAP',
      'SBOM_PER_IMAGE',
    ],
    competitor: 'ubuntu-core',
  },
]

export function getClient(slug: string): ClientConfig | undefined {
  return clients.find((c) => c.slug === slug)
}
