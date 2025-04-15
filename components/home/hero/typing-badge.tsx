'use client'

import React, { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const TypingBadge = () => {
  const t = useTranslations('pages.home.hero')
  const [displayedText, setDisplayedText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const text = t('typingBadge')
  const typingSpeed = 60 
  const pauseBeforeRepeat = 3000 

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
    <div
      className={cn(
        'inline-flex items-center rounded-full bg-blue-100 py-1.5 px-4',
        'border border-blue-200 shadow-sm animate-fadeIn'
      )}
      style={{
        animationDuration: '400ms',
        willChange: "opacity, transform",
        transform: "translateZ(0)"
      }}
    >
      <div className="animate-pulse mr-2">
        <Clock className="h-4 w-4 text-blue-700 flex-shrink-0" />
      </div>
      <div className="font-medium text-sm text-blue-700 flex-grow text-left whitespace-nowrap">
        <div className="h-[1.2em] relative">
          {displayedText}
          <span 
            className={cn(
              "absolute top-0 bottom-0 my-auto right-[-2px] inline-block w-[1.5px] h-[0.9em] bg-blue-700 transition-opacity duration-100",
              cursorVisible ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default TypingBadge