import type { ProductKey } from '@/lib/clients'

/**
 * Guide topics, mirroring the production site's standalone guide pages.
 * Each belongs to the product it argues for, which drives the kicker and
 * the cross-links back into the platform page.
 */
export type GuideKey =
  | 'secure-boot'
  | 'immutable-linux'
  | 'signed-ota'
  | 'deploy-software-to-jetson'
  | 'mesh-network'
  | 'fleet-management'

export type Guide = {
  key: GuideKey
  product: ProductKey
  title: string
  /** One-line summary under the title. */
  intro: string
  /** Body sections: a heading and a short supporting paragraph. */
  sections: { heading: string; body: string }[]
  /** Capability rows, rendered as [ OK ] lines. */
  points: string[]
  /** Other guides worth reading next. */
  related: GuideKey[]
}

export const GUIDES: Record<GuideKey, Guide> = {
  'secure-boot': {
    key: 'secure-boot',
    product: 'gwos',
    title: 'Secure boot',
    intro:
      'Every stage from power-on through payload execution has to prove integrity before a mission asset runs inference, navigation, or comms software.',
    sections: [
      {
        heading: 'What secure boot must cover on Jetson',
        body: 'A credible boot story spans the bootloader, kernel, device tree, and root filesystem — not a one-time flash script. GWOS pins JetPack components with kernel-locked CUDA and TensorRT versions so what you attested is what runs.',
      },
      {
        heading: 'Built for production, not developer kits',
        body: 'Reference boot flows are fine for prototyping. Fielded programs die on kernel drift, unsigned updates, and CUDA breakage — which is what GWOS is built to prevent on Orin, NX, and Nano.',
      },
    ],
    points: [
      'Verified boot chain from power-on through rootfs mount',
      'TPM-backed device identity and SBOM per image',
      'Atomic rollback when attestation or health checks fail',
      'Signed OTA over low-bandwidth, DDIL links',
    ],
    related: ['immutable-linux', 'signed-ota', 'deploy-software-to-jetson'],
  },
  'immutable-linux': {
    key: 'immutable-linux',
    product: 'gwos',
    title: 'Immutable Linux',
    intro:
      'Treat the root filesystem as an artifact you ship, verify, and replace atomically — rather than something you patch in place on hardware you cannot reach.',
    sections: [
      {
        heading: 'Immutable OS vs. mutable production pain',
        body: 'A mutable rootfs on field hardware invites configuration skew across a fleet. An immutable image means every node runs the same verified bits, and updates swap partitions instead of patching in the field.',
      },
      {
        heading: 'Beyond read-only rootfs how-tos',
        body: 'Overlay tricks and read-only toggles are a hobbyist path. Production immutability needs signed update channels, atomic promotion, and a rollback that holds when the link is gone.',
      },
    ],
    points: [
      'Read-only rootfs with explicit, signed update paths',
      'A/B partitions for atomic promotion and rollback',
      'Pinned NVIDIA JetPack stack — CUDA, TensorRT, cuDNN locked to the image',
      'SBOM and attestation metadata shipped with every build',
    ],
    related: ['secure-boot', 'signed-ota', 'deploy-software-to-jetson'],
  },
  'signed-ota': {
    key: 'signed-ota',
    product: 'poolboy',
    title: 'Signed OTA',
    intro:
      'How edge AI devices accept firmware and software updates without having to trust the network in between.',
    sections: [
      {
        heading: 'Firmware updates with verification, not hope',
        body: 'OTA for edge AI has to assume DDIL links and adversarial networks. Updates are signed, acknowledged per node, and paired with rollback paths — not silent auto-updates from a vendor cloud you do not control.',
      },
      {
        heading: 'One stack, two layers',
        body: 'GWOS handles the OS image layer and Poolboy handles the payload layer, so an OS rollback and a payload rollback are separate decisions that still interlock.',
      },
    ],
    points: [
      'GWOS: signed OS images, delta OTA, A/B rollback on Jetson',
      'Poolboy: signed payload manifests, fleet waves, LKG rollback',
      'Delivery over Poolnet when backhaul is unavailable',
      'SBOM and attestation metadata carried with images',
    ],
    related: ['secure-boot', 'immutable-linux', 'fleet-management'],
  },
  'deploy-software-to-jetson': {
    key: 'deploy-software-to-jetson',
    product: 'gwos',
    title: 'Deploy software to Jetson',
    intro:
      'The question that lands right after the bench demo: how do you get from a JetPack SDK flash to a fleet rollout at scale?',
    sections: [
      {
        heading: 'JetPack SDK to fleet-at-scale rollout',
        body: 'SDK Manager gets modules provisioned. Shipping inference, perception, and autonomy payloads across many nodes — Orin production modules, carrier boards, DDIL field assets — needs a pinned stack and a rollout plane.',
      },
      {
        heading: 'Containers plus platform discipline',
        body: 'Container images are part of the story, not the whole production path. Payload verification, mesh delivery, and cross-layer rollback still have to be solved underneath them.',
      },
    ],
    points: [
      'GWOS: production Linux image with kernel-locked JetPack components',
      'Poolboy: signed manifest rollout — canary, wave, fleet at scale',
      'Poolnet: reach nodes when cloud backhaul is absent',
      'Integrated rollback across OS and payload layers',
    ],
    related: ['secure-boot', 'immutable-linux', 'fleet-management'],
  },
  'mesh-network': {
    key: 'mesh-network',
    product: 'poolnet',
    title: 'Mesh network',
    intro:
      'A mesh for autonomous systems has to keep working when LTE is jammed, satcom degrades, and backhaul disappears entirely.',
    sections: [
      {
        heading: 'Mesh that survives EW and geography',
        body: 'Cloud-trained autonomy has no path home when the link dies. Poolnet discovers peers, routes around partitions, and lets an operator reach any node from a co-deployed asset, a laptop at the edge, or a tethered egress point.',
      },
      {
        heading: 'Interlocks with rollout and OS',
        body: 'Poolnet carries signed manifests from Poolboy to GWOS nodes across the same mesh, so deployment and connectivity share one set of contested-edge assumptions.',
      },
    ],
    points: [
      'Encrypted peer links with per-node keypairs',
      'Partition-tolerant operation without mandatory backhaul',
      'Policy-driven egress when a horizon link exists',
      'Operator-in-the-loop ACLs and audit trails',
    ],
    related: ['signed-ota', 'fleet-management'],
  },
  'fleet-management': {
    key: 'fleet-management',
    product: 'poolboy',
    title: 'Fleet management',
    intro:
      'Getting models, firmware, calibration, and signed payloads onto robots, UAS, and ground vehicles that are already deployed.',
    sections: [
      {
        heading: 'Robot fleet rollout without a cluster',
        body: 'Shipping AI to a robot fleet is firmware, weights, sensors, radios, OTA, and a rollback plan that works when the operator is wearing gloves. Poolboy treats every rollout as the live operation it is.',
      },
      {
        heading: 'The job we deliberately do not do',
        body: 'This is not warehouse AMR orchestration or ground-logistics fleet software. Poolboy is built for payload OTA on autonomous defense platforms.',
      },
    ],
    points: [
      'Canary, wave, and region targeting across mixed platforms',
      'Cryptographically signed manifests with per-node ack',
      'Atomic rollback to last-known-good on breach',
      'Bandwidth-aware, resumable delivery over Poolnet',
    ],
    related: ['signed-ota', 'mesh-network', 'deploy-software-to-jetson'],
  },
}

export const guideKeys = Object.keys(GUIDES) as GuideKey[]

/** Guides belonging to a given product, for the platform page cross-links. */
export function guidesForProduct(product: ProductKey): Guide[] {
  return guideKeys.map((k) => GUIDES[k]).filter((g) => g.product === product)
}
