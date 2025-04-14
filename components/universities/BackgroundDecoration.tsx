'use client'

import React from 'react'

const BackgroundDecoration = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -left-24 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-100/20 rounded-full blur-3xl"></div>
    </div>
  )
}

export default BackgroundDecoration