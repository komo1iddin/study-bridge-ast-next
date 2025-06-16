'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// Define form schema with validation
const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>

interface ApplicationFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmitSuccess?: (data: FormValues) => void
}

const ApplicationFormModal = ({ open, onOpenChange, onSubmitSuccess }: ApplicationFormModalProps) => {
  const t = useTranslations('components.applicationForm')
  const { toast } = useToast()
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '+998 ',
      level: '',
    },
  })

  const handleSubmit = async (data: FormValues) => {
    try {
      // Log form data to console
      console.log('Form submitted:', data)
      
      // Send data to API endpoint
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
      
      // Call the success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess(data)
      }
      
      // Show success toast
      toast({
        title: t('notifications.success.title'),
        description: t('notifications.success.description'),
      })
      
      // Reset form and close modal
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error('Error submitting form:', error)
      
      // Show error toast
      toast({
        title: t('notifications.error.title'),
        description: t('notifications.error.description'),
        variant: 'destructive',
      })
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { 
        duration: 0.2,
        ease: 'easeIn'  
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogContent asChild forceMount>
            <motion.div
              className={cn('sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg')}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <DialogHeader>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <DialogTitle>{t('title')}</DialogTitle>
                  <DialogDescription>
                    {t('subtitle')}
                  </DialogDescription>
                </motion.div>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.fullName.label')}<span className="text-red-500 ml-1">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('fields.fullName.placeholder')} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.phoneNumber.label')}<span className="text-red-500 ml-1">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('fields.phoneNumber.placeholder')} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.level.label')}<span className="text-red-500 ml-1">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('fields.level.placeholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="chinese_language">{t('fields.level.options.chinese_language')}</SelectItem>
                            <SelectItem value="college">{t('fields.level.options.college')}</SelectItem>
                            <SelectItem value="bachelor">{t('fields.level.options.bachelor')}</SelectItem>
                            <SelectItem value="master">{t('fields.level.options.master')}</SelectItem>
                            <SelectItem value="phd">{t('fields.level.options.phd')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter className="pt-4">
                    <motion.div
                      className="w-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center space-x-2"
                          >
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>{t('actions.submit')}</span>
                          </motion.div>
                        ) : (
                          t('actions.submit')
                        )}
                      </Button>
                    </motion.div>
                  </DialogFooter>
                </form>
              </Form>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

export default ApplicationFormModal 