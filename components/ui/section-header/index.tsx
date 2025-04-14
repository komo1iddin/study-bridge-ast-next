'use client'

import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  alignment?: 'left' | 'center' | 'right'
  className?: string
}

const SectionHeader = ({
  title,
  subtitle,
  alignment = 'center',
  className
}: SectionHeaderProps) => {
  return (
    <div 
      className={cn(
        'mb-10',
        {
          'text-center': alignment === 'center',
          'text-left': alignment === 'left',
          'text-right': alignment === 'right'
        },
        className
      )}
    >
      <h2 
        className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeader 