'use client'

import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'

interface SectionHeaderProps {
  namespace: string
  path: string
}

export function SectionHeader({ namespace, path }: SectionHeaderProps) {
  const t = useTranslations(namespace)
  
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
      <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
        {t(`${path}.badge`, { default: 'Section' })}
      </Badge>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
        {t(`${path}.title`, { default: 'Section Title' })}
      </h2>
      <p className="max-w-[800px] text-muted-foreground md:text-xl">
        {t(`${path}.subtitle`, { default: 'Section description' })}
      </p>
    </div>
  )
} 