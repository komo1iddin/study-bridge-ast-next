'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Send, BookOpen } from 'lucide-react'
import { useParams } from 'next/navigation'

interface HeroButtonsProps {
  onOpenForm: () => void;
  leaveRequestText: string;
  viewUniversitiesText: string;
}

const HeroButtons = ({ onOpenForm, leaveRequestText, viewUniversitiesText }: HeroButtonsProps) => {
  const params = useParams()
  const locale = params.locale as string || 'en'
  
  return (
    <div className={cn('flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto')}>
      <div 
        className="w-full sm:w-auto transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <Button
          onClick={onOpenForm}
          className={cn(
            'bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 sm:px-8 py-5 sm:py-6 rounded-xl text-sm sm:text-base shadow-md transition duration-300 w-full sm:w-auto group'
          )}
        >
          {leaveRequestText}
          <span className="ml-2 inline-flex transition-transform duration-300 group-hover:translate-x-1">
            <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
          </span>
        </Button>
      </div>

      <div
        className="w-full sm:w-auto transition-transform duration-200 hover:scale-105 active:scale-95 animate-fadeIn"
        style={{ animationDelay: '200ms' }}
      >
        <Link href={`/${locale}/universities`} passHref>
          <Button
            variant="outline"
            className={cn(
              'border-gray-300 hover:bg-gray-100 font-medium px-6 sm:px-8 py-5 sm:py-6 rounded-xl text-sm sm:text-base shadow-sm transition duration-300 w-full sm:w-auto group'
            )}
          >
            {viewUniversitiesText}
            <span className="ml-2 inline-flex transition-transform duration-300 group-hover:translate-x-1">
              <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default HeroButtons 