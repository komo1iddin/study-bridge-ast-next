'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BackgroundProps {
  className?: string
}

// Helper for lerping between two values
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function SeamlessBackground({ className }: BackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = window.devicePixelRatio || 1

    // Gradient blobs state
    const blobs = [
      {
        color: 'rgba(59,130,246,0.10)', // blue-500
        r: 320,
        x: width * 0.2,
        y: height * 0.3,
        tx: width * 0.2,
        ty: height * 0.3,
      },
      {
        color: 'rgba(99,102,241,0.10)', // indigo-500
        r: 260,
        x: width * 0.7,
        y: height * 0.6,
        tx: width * 0.7,
        ty: height * 0.6,
      },
      {
        color: 'rgba(16,185,129,0.08)', // emerald-500
        r: 200,
        x: width * 0.5,
        y: height * 0.8,
        tx: width * 0.5,
        ty: height * 0.8,
      },
    ]

    function resize() {
      if (!canvas || !ctx) return
      width = window.innerWidth
      height = window.innerHeight
      dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, width, height)

      // Subtle vertical gradient background
      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, '#f0f7ff')
      grad.addColorStop(1, '#f8fafc')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Animate blobs
      blobs.forEach((blob, i) => {
        // Animate towards target
        blob.x = lerp(blob.x, blob.tx, 0.01)
        blob.y = lerp(blob.y, blob.ty, 0.01)

        // Draw radial gradient
        const g = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r)
        g.addColorStop(0, blob.color)
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    function randomizeTargets() {
      blobs.forEach((blob, i) => {
        blob.tx = Math.random() * width
        blob.ty = Math.random() * height
      })
    }

    resize()
    animate()
    const resizeListener = () => {
      resize()
    }
    window.addEventListener('resize', resizeListener)
    const interval = setInterval(randomizeTargets, 9000)

    return () => {
      window.removeEventListener('resize', resizeListener)
      clearInterval(interval)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className={cn('fixed inset-0 w-full h-full -z-10', className)}>
      <motion.canvas
        ref={canvasRef}
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  )
}

export function FadedDivider() {
  return (
    <div className="w-full h-24 bg-gradient-to-b from-transparent to-white/5 opacity-50" />
  )
} 