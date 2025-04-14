'use client'

import { motion } from 'framer-motion'

export function BackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Blobs */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-blue-100/60 blur-3xl"
        style={{ top: '10%', left: '5%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: [0, 30, -20, 0],
          y: [0, -50, 20, 0],
        }}
        transition={{
          opacity: { duration: 1 },
          scale: { duration: 1.2 },
          x: { repeat: Infinity, duration: 20, ease: "easeInOut" },
          y: { repeat: Infinity, duration: 20, ease: "easeInOut" },
        }}
      />
      
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-purple-100/50 blur-3xl"
        style={{ bottom: '20%', right: '15%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: [0, -30, 20, 0],
          y: [0, 30, -40, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 0.2 },
          scale: { duration: 1.2, delay: 0.2 },
          x: { repeat: Infinity, duration: 23, ease: "easeInOut" },
          y: { repeat: Infinity, duration: 23, ease: "easeInOut" },
        }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-green-100/40 blur-3xl"
        style={{ top: '30%', right: '10%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: [0, 40, -30, 0],
          y: [0, -30, 50, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 0.4 },
          scale: { duration: 1.2, delay: 0.4 },
          x: { repeat: Infinity, duration: 25, ease: "easeInOut" },
          y: { repeat: Infinity, duration: 25, ease: "easeInOut" },
        }}
      />
      
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-orange-100/30 blur-3xl"
        style={{ bottom: '10%', left: '15%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: [0, -20, 40, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 0.6 },
          scale: { duration: 1.2, delay: 0.6 },
          x: { repeat: Infinity, duration: 22, ease: "easeInOut" },
          y: { repeat: Infinity, duration: 22, ease: "easeInOut" },
        }}
      />
    </div>
  )
} 