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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 lg:py-20 relative">
        {/* Left Content */}
        <div className="lg:col-span-7 z-10">
          <motion.div variants={itemVariants}>
            <TypingBadge />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold mt-6 leading-tight'
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
              'mt-6 text-gray-700 text-lg leading-relaxed max-w-lg'
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
              'flex flex-wrap justify-center lg:justify-start gap-6 mt-12'
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
          className="lg:col-span-5 relative min-h-[400px] lg:min-h-[600px]"
        >
          <TestimonialCards />

          {/* Decorative elements */}
          <motion.div 
            variants={decorativeVariants}
            className="absolute top-[10%] right-[10%] w-32 h-32 bg-blue-100/50 rounded-full"
          />
          <motion.div 
            variants={decorativeVariants}
            className="absolute bottom-[20%] right-[30%] w-16 h-16 bg-amber-100/40 rounded-full"
          />
        </motion.div>
      </div>

      {/* Application Form Dialog */}
      <ApplicationForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </motion.div>
  )
} 