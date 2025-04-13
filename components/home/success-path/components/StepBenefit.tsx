import React from 'react'
import { CheckCircle2 } from 'lucide-react'

interface StepBenefitProps {
  benefit: string
  stepColor: string
}

const StepBenefit = ({ benefit, stepColor }: StepBenefitProps) => {
  return (
    <div 
      className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <CheckCircle2 
        className="w-5 h-5 mt-0.5 flex-shrink-0" 
        style={{ color: stepColor }} 
      />
      <span className="text-gray-700 text-sm md:text-base">
        {benefit}
      </span>
    </div>
  )
}

export default StepBenefit 