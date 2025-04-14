'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Send, BookOpen } from 'lucide-react'

interface HeroButtonsProps {
  onOpenForm: () => void;
  leaveRequestText: string;
  viewUniversitiesText: string;
}

const HeroButtons = ({ onOpenForm, leaveRequestText, viewUniversitiesText }: HeroButtonsProps) => {
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  }
  
  const iconVariants = {
    initial: { x: 0 },
    hover: { 
      x: 3,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 0.6
      }
    }
  }

  return (
    <div className={cn('flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto')}>
      <motion.div
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="w-full sm:w-auto"
      >
        <Button
          onClick={onOpenForm}
          className={cn(
            'bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 sm:px-8 py-5 sm:py-6 rounded-xl text-sm sm:text-base shadow-md transition duration-300 w-full sm:w-auto'
          )}
        >
          {leaveRequestText}
          <motion.span 
            className="ml-2 inline-flex"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
          </motion.span>
        </Button>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full sm:w-auto"
      >
        <Button
          variant="outline"
          className={cn(
            'border-gray-300 hover:bg-gray-100 font-medium px-6 sm:px-8 py-5 sm:py-6 rounded-xl text-sm sm:text-base shadow-sm transition duration-300 w-full sm:w-auto'
          )}
        >
          {viewUniversitiesText}
          <motion.span 
            className="ml-2 inline-flex"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" />
          </motion.span>
        </Button>
      </motion.div>
    </div>
  )
}

export default HeroButtons 