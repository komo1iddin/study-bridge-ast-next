import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CallToActionProps {
  buttonText: string
  buttonLink?: string
}

const CallToAction = ({ buttonText, buttonLink = '/services' }: CallToActionProps) => {
  return (
    <div className="text-center mt-12 md:mt-16">
      <Button 
        asChild
        size="lg"
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Link href={buttonLink}>{buttonText}</Link>
      </Button>
    </div>
  )
}

export default CallToAction 