'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TypingBadge from './TypingBadge'
import TestimonialCards from './TestimonialCards'
import HeroButtons from './HeroButtons'
import ApplicationForm from './ApplicationForm'
import StatItem from './StatItem'
import { cn } from '@/lib/utils'

export default function HeroSection() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const decorativeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, delay: 0.5 }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Hero Section - Removed container, assuming parent provides layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 pt-1 pb-8 md:pt-4 md:pb-12 lg:pt-8 lg:pb-20 relative px-4 md:px-6 lg:px-0">
        {/* Left Content */}
        <div className="lg:col-span-7 z-10 flex flex-col items-center lg:items-start">
          <motion.div variants={itemVariants} className="w-full flex justify-center lg:justify-start">
            <TypingBadge />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={cn(
              'text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 sm:mt-6 leading-tight text-center lg:text-left'
            )}
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            <span className="text-blue-600">Ваш мост</span> между <br />
            <span className="relative">
              Узбекистаном
              <span className="absolute bottom-2 left-0 w-full h-2 bg-amber-300/40 -z-10"></span>
            </span>{' '}
            и <br />
            <span className="relative">
              Китаем
              <span className="absolute bottom-2 left-0 w-full h-2 bg-amber-300/40 -z-10"></span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={cn(
              'mt-4 sm:mt-6 text-gray-600 text-sm sm:text-lg leading-relaxed max-w-lg text-center lg:text-left mx-auto lg:mx-0'
            )}
          >
            Обучение в лучших университетах Китая для узбекских студентов.
            Полное сопровождение от подачи документов до получения диплома.
          </motion.p>

          <motion.div variants={itemVariants}>
            <HeroButtons onOpenForm={() => setIsFormOpen(true)} />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={cn(
              'flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10 md:mt-12'
            )}
          >
            <StatItem value="5000+" label="Студентов" delay={0.2} />
            <StatItem value="50+" label="Университетов" delay={0.4} />
            <StatItem value="10+" label="Лет опыта" delay={0.6} />
          </motion.div>
        </div>

        {/* Right Side - Scrolling Testimonials */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-5 relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[600px] mt-4 lg:mt-0"
        >
          <TestimonialCards />

          {/* Decorative elements */}
          <motion.div 
            variants={decorativeVariants}
            className="absolute top-[10%] right-[10%] w-20 h-20 md:w-32 md:h-32 bg-blue-100/50 rounded-full hidden sm:block"
          />
          <motion.div 
            variants={decorativeVariants}
            className="absolute bottom-[20%] right-[30%] w-10 h-10 md:w-16 md:h-16 bg-amber-100/40 rounded-full hidden sm:block"
          />
        </motion.div>
      </div>

      {/* Application Form Dialog */}
      <ApplicationForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </motion.div>
  )
} 