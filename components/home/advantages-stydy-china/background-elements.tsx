'use client'

import { motion } from 'framer-motion'

export function BackgroundElements() {
  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      style={{ 
        transform: 'translateZ(0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Static blobs replacing most of the animated ones for better performance */}
      <div
        className="absolute w-72 h-72 rounded-full bg-blue-100/60 blur-3xl"
        style={{ top: '10%', left: '5%', transform: 'translateZ(0)' }}
      />
      
      <div
        className="absolute w-96 h-96 rounded-full bg-purple-100/50 blur-3xl"
        style={{ bottom: '20%', right: '15%', transform: 'translateZ(0)' }}
      />
      
      <div
        className="absolute w-64 h-64 rounded-full bg-orange-100/30 blur-3xl"
        style={{ bottom: '10%', left: '15%', transform: 'translateZ(0)' }}
      />
      
      {/* Keep only one subtle animation for visual interest */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-green-100/40 blur-3xl"
        style={{ 
          top: '30%', 
          right: '10%',
          willChange: 'transform', 
          transform: 'translateZ(0)'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 0.4 },
          scale: { duration: 1.2, delay: 0.4 },
          y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
        }}
      />
    </div>
  )
} 