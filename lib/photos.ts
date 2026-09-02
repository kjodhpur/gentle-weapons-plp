import fs from 'node:fs'
import path from 'node:path'

import type { Prospect } from '@/lib/prospects'
import { prospectSlug } from '@/lib/prospects'

const PEOPLE_DIR = path.join(process.cwd(), 'public', 'people')
const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']

/**
 * Headshot for a contact, if one has been dropped in /public/people.
 *
 * Resolved at build time on the server: a file named by the person's slug
 * (e.g. public/people/colby-adcock.jpg) is picked up with no config change.
 * Nothing is fetched from anywhere — photos only appear when someone has
 * deliberately placed a file here.
 */
export function prospectPhoto(p: Prospect): string | undefined {
  const slug = prospectSlug(p)
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(PEOPLE_DIR, `${slug}.${ext}`))) {
      return `/people/${slug}.${ext}`
    }
  }
  return undefined
}
