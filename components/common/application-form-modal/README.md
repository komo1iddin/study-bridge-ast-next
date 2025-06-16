# Application Form Modal Component

A reusable modal form component for submitting applications ("Ariza qoldirish") across the Study Bridge website.

## Features

- Full name input field with validation
- Phone number input field (Uzbekistan format: +998 XX XXX XX XX) with validation
- Education level selection dropdown with options
- Internationalization support (en, ru, uz)
- Form validation using Zod
- Animated transitions using Framer Motion
- Success notifications using Toast

## Usage

### Basic Usage

```tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ApplicationFormModal from '@/components/common/application-form-modal'

export function MyComponent() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsFormOpen(true)}>
        Ariza qoldirish
      </Button>
      
      <ApplicationFormModal 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
      />
    </>
  )
}
```

### With Form Submission Handler

```tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ApplicationFormModal from '@/components/common/application-form-modal'

export function MyComponent() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  
  const handleFormSubmit = async (data) => {
    // Access form data
    console.log('Form submitted:', data)
    
    // Example: Send data to API
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit application')
      }
      
      // Handle success
      console.log('Application submitted successfully')
    } catch (error) {
      console.error('Error submitting application:', error)
    }
  }
  
  return (
    <>
      <Button onClick={() => setIsFormOpen(true)}>
        Ariza qoldirish
      </Button>
      
      <ApplicationFormModal 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSubmitSuccess={handleFormSubmit}
      />
    </>
  )
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `open` | boolean | Controls whether the modal is open |
| `onOpenChange` | (open: boolean) => void | Callback when the modal open state changes |
| `onSubmitSuccess` | (data: FormValues) => void | Optional callback when form is successfully submitted |

## Form Values

The form collects the following data:

```typescript
type FormValues = {
  fullName: string;
  phoneNumber: string; // Format: +998 XX XXX XX XX
  level: string; // One of: "chinese_language", "college", "bachelor", "master", "phd"
}
```

## Internationalization

The component uses translations from the `components.applicationForm` namespace. Make sure to define the following translation keys:

- `title`
- `subtitle`
- `fields.fullName.label`
- `fields.fullName.placeholder`
- `fields.phoneNumber.label`
- `fields.phoneNumber.placeholder`
- `fields.level.label`
- `fields.level.placeholder`
- `fields.level.options.chinese_language`
- `fields.level.options.college`
- `fields.level.options.bachelor`
- `fields.level.options.master`
- `fields.level.options.phd`
- `actions.submit`
- `notifications.success.title`
- `notifications.success.description`
- `notifications.error.title`
- `notifications.error.description` 