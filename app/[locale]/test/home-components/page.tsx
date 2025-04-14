'use client'

import { OurTeam, OurPartners } from '@/components/home'
import { useParams } from 'next/navigation'

export default function HomeComponentsTestPage() {
  const params = useParams()
  const locale = Array.isArray(params.locale) ? params.locale[0] : (params.locale as string || 'en')
  
  return (
    <div>
      <OurTeam lang={locale} />
      <OurPartners lang={locale} />
    </div>
  )
} 