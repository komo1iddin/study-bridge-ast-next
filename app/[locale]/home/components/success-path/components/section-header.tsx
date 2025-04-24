import React from 'react'

interface SectionHeaderProps {
  title: string
  subtitle: string
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
      <p className="text-lg text-gray-600 mb-8">{subtitle}</p>
    </div>
  )
}

export default SectionHeader 