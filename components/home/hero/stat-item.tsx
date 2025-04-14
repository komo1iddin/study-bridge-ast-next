'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatItemProps {
  value: string
  label: string
  delay?: number
}

const ITEM_VARIANT = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      delay: 0,
      ease: "easeOut" 
    }
  },
  hover: {
    y: -5,
    boxShadow: "0 8px 15px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 }
  }
}

function StatItem({ value, label, delay = 0 }: StatItemProps) {
  const itemVariant = {
    ...ITEM_VARIANT,
    visible: {
      ...ITEM_VARIANT.visible,
      transition: {
        ...ITEM_VARIANT.visible.transition,
        delay
      }
    }
  }

  return (
    <motion.div
      variants={itemVariant}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={cn(
        'bg-white rounded-xl px-4 sm:px-6 py-3 sm:py-4',
        'shadow-sm',
        'border border-gray-100 flex flex-col items-center'
      )}
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
    </motion.div>
  )
}

export { StatItem } 