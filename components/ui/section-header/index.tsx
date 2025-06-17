'use client'

import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  alignment?: 'left' | 'center' | 'right'
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  badge?: string
  badgeClassName?: string
}

const SectionHeader = ({
  title,
  subtitle,
  alignment = 'center',
  className,
  titleClassName,
  subtitleClassName,
  badge,
  badgeClassName
}: SectionHeaderProps) => {
  return (
    <div 
      className={cn(
        'mb-8',
        {
          'text-center': alignment === 'center',
          'text-left': alignment === 'left',
          'text-right': alignment === 'right',
          'max-w-4xl mx-auto': alignment === 'center',
          'max-w-4xl': alignment !== 'center'
        },
        className
      )}
    >
      {badge && (
        <div className="mb-3 flex justify-center">
          <div className={cn(
            "bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold",
            alignment === 'left' && "ml-0 mr-auto",
            alignment === 'right' && "mr-0 ml-auto",
            badgeClassName
          )}>
            {badge}
          </div>
        </div>
      )}
      <h2 
        className={cn(
          "text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-gray-900 mb-3 md:mb-4",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg text-gray-600 max-w-3xl",
          alignment === 'left' && "ml-0 mr-auto",
          alignment === 'right' && "mr-0 ml-auto",
          alignment === 'center' && "mx-auto",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeader 