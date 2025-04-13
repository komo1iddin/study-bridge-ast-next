'use client'

import { motion } from 'framer-motion'

export function BackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Blobs */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-blue-100/60 blur-3xl"
        style={{ top: '10%', left: '5%' }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-purple-100/50 blur-3xl"
        style={{ bottom: '20%', right: '15%' }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          delay: 2,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-green-100/40 blur-3xl"
        style={{ top: '30%', right: '10%' }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          delay: 4,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-orange-100/30 blur-3xl"
        style={{ bottom: '10%', left: '15%' }}
        animate={{
          x: [0, -20, 40, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          delay: 1,
          ease: "easeInOut",
        }}
      />
    </div>
  )
} 