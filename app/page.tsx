import { LeadFlow } from '@/components/lead-flow'

export const metadata = {
  title: 'Lead routing | Gentle Weapons',
  description:
    'How a prospect contact resolves to a personalized landing page, and which sample contact receives which page.',
}

export default function Home() {
  return (
    <>
      <div className="noise" aria-hidden />
      <LeadFlow />
    </>
  )
}
