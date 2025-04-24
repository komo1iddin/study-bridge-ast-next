'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface StatItemProps {
  value: string
  label: string
  delay?: number
}

function StatItem({ value, label, delay = 0 }: StatItemProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl px-4 sm:px-6 py-3 sm:py-4',
        'shadow-sm',
        'border border-gray-100 flex flex-col items-center',
        'transition-all duration-200 ease-out',
        'hover:shadow-md hover:-translate-y-1'
      )}
      style={{
        animationDelay: `${delay * 100}ms`,
        animationDuration: '400ms',
        animationFillMode: 'both',
        animationName: 'fadeIn'
      }}
    >
      <div
        className={cn('text-2xl sm:text-3xl font-bold')}
        style={{
          background: 'linear-gradient(90deg, #2463EB, #3b82f6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          position: 'relative'
        }}
      >
        {value}
        <div
          className="absolute bottom-[-3px] sm:bottom-[-4px] left-0 w-full h-[2px] sm:h-[3px]"
          style={{
            background: 'linear-gradient(90deg, #2463EB, #3b82f6)'
          }}
        />
      </div>
      <div className={cn('text-xs sm:text-sm text-gray-600 mt-1 font-medium')}>
        {label}
      </div>
    </div>
  )
}

export { StatItem }

// Add this to your global CSS
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// } 