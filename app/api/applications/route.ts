import { NextResponse } from 'next/server'
import { z } from 'zod'

// Define validation schema for the application form
const applicationSchema = z.object({
  fullName: z.string().min(3, {
    message: 'Full name must be at least 3 characters',
  }),
  phoneNumber: z.string().regex(/^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/, {
    message: 'Phone number must be in format: +998 XX XXX XX XX',
  }),
  level: z.string({
    required_error: 'Please select a level',
  }),
})

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()
    
    // Validate the request body
    const validatedData = applicationSchema.parse(body)
    
    // Here you would typically:
    // 1. Save the data to a database
    // 2. Send an email notification
    // 3. Perform any other necessary actions
    
    // For now, we'll just log the data and return a success response
    console.log('Application received:', validatedData)
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully' 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error processing application:', error)
    
    // Check if it's a validation error
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        success: false, 
        message: 'Validation error', 
        errors: error.errors 
      }, { status: 400 })
    }
    
    // Return generic error response
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to process application' 
    }, { status: 500 })
  }
} 