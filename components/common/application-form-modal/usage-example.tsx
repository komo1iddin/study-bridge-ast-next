'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import ApplicationFormModal from './application-form-modal'

/**
 * Example component showing how to use the ApplicationFormModal
 * 
 * This component demonstrates how to:
 * 1. Create a button that opens the modal
 * 2. Handle the open/close state of the modal
 * 3. Handle form submission success
 */
export const ApplicationFormExample = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  
  const handleFormSubmit = (data: any) => {
    console.log('Form submitted with data:', data)
    // You can perform additional actions here
  }
  
  return (
    <div>
      <Button 
        onClick={() => setIsFormOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Ariza qoldirish
      </Button>
      
      <ApplicationFormModal 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSubmitSuccess={handleFormSubmit}
      />
    </div>
  )
}

export default ApplicationFormExample 