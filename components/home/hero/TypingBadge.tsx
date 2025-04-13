'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimate, usePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const TypingBadge = () => {
  const [scope, animate] = useAnimate()
  const [isPresent, safeToRemove] = usePresence()
  const [typingComplete, setTypingComplete] = useState(false)
  const text = "Набор открыт до 15 мая 2025"

  useEffect(() => {
    if (isPresent) {
      const typingAnimation = async () => {
        await animate(scope.current, { width: "0%" }, { duration: 0.01 })
        await animate(scope.current, { width: "100%" }, { duration: 1, delay: 0.5 })
        setTypingComplete(true)
        
        // Reset animation after a delay for continuous effect
        setTimeout(async () => {
          await animate(scope.current, { width: "0%" }, { duration: 0.5 })
          setTypingComplete(false)
          typingAnimation()
        }, 4000)
      }
      
      typingAnimation()
    }
  }, [animate, isPresent, scope])

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-blue-100/80 py-1.5 px-4',
        'border border-blue-200 shadow-sm'
      )}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Clock className="mr-2 h-4 w-4 text-blue-600" />
      </motion.div>
      <div className="overflow-hidden whitespace-nowrap text-center">
        <div className="relative">
          <span className="invisible text-blue-600 text-sm font-medium">
            {text}
          </span>
          <motion.span
            ref={scope}
            className={cn(
              'text-blue-600 text-sm font-medium absolute top-0 left-0 overflow-hidden border-r-2 border-blue-600'
            )}
            style={{ width: '0%' }}
          >
            {text}
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

export default TypingBadge 