'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const TypingBadge = () => {
  const [displayedText, setDisplayedText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const text = "Набор открыт до 15 мая 2025"
  const typingSpeed = 40 // Faster typing (was 80)
  const pauseBeforeRepeat = 3000 // Milliseconds

  useEffect(() => {
    let charIndex = 0
    let timeoutId: NodeJS.Timeout | null = null

    const type = () => {
      if (charIndex < text.length) {
        setDisplayedText(text.substring(0, charIndex + 1))
        charIndex++
        timeoutId = setTimeout(type, typingSpeed)
      } else {
        // Pause at the end, then reset
        timeoutId = setTimeout(() => {
          setDisplayedText("")
          charIndex = 0
          timeoutId = setTimeout(type, typingSpeed)
        }, pauseBeforeRepeat)
      }
    }

    // Start typing after a short delay
    timeoutId = setTimeout(type, 500)

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 500)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      clearInterval(cursorInterval)
    }
  }, [text, typingSpeed, pauseBeforeRepeat])

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'inline-flex items-center rounded-full bg-blue-100 py-1.5 px-4',
        'border border-blue-200 shadow-sm w-[280px]'
      )}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <Clock className="mr-2 h-4 w-4 text-blue-700 flex-shrink-0" />
      </motion.div>
      <div className="font-medium text-sm text-blue-700 flex-grow text-left">
        <div className="h-[1.2em] relative">
          {displayedText}
          <motion.span 
            animate={{ opacity: cursorVisible ? 1 : 0 }}
            transition={{ duration: 0, repeat: Infinity, repeatType: "loop", ease: "linear" }}
            className="absolute top-0 bottom-0 my-auto right-[-2px] inline-block w-[1.5px] h-[0.9em] bg-blue-700"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default TypingBadge