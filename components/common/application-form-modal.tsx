'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

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

// Animation variants
const contentVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
}

// Form schema with validation
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  phoneNumber: z.string().regex(/^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/, {
    message: 'Phone number must be in format: +998 XX XXX XX XX',
  }),
  educationLevel: z.string({
    required_error: 'Please select an education level.',
  }),
})

type FormValues = z.infer<typeof formSchema>

// Component props
interface ApplicationFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmitSuccess?: () => void
}

const ApplicationFormModal = ({ open, onOpenChange, onSubmitSuccess }: ApplicationFormModalProps) => {
  const t = useTranslations('contactForm')
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
    },
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (data: FormValues) => {
    try {
      // Here you would send the data to your API
      console.log('Form submitted:', data)
      
      // Success notification
      toast({
        title: t('notifications.success'),
        duration: 3000,
      })
      
      // Reset form
      form.reset()
      
      // Close modal
      onOpenChange(false)
      
      // Call success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess()
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: t('notifications.error'),
        variant: 'destructive',
        duration: 3000,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence mode="wait">
        {open && (
          <DialogContent className="max-w-md sm:max-w-[400px]">
            <motion.div
              className="w-full"
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
                  <DialogDescription>{t('subtitle')}</DialogDescription>
                </motion.div>
              </DialogHeader>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('fields.firstName.label')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('fields.firstName.placeholder')} {...field} />
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
                          <FormLabel>{t('fields.phone.label')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('fields.phone.placeholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="educationLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('fields.program.label')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('fields.program.placeholder')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="chinese_language">{t('fields.program.options.business')}</SelectItem>
                              <SelectItem value="college">{t('fields.program.options.it')}</SelectItem>
                              <SelectItem value="bachelor">{t('fields.program.options.medicine')}</SelectItem>
                              <SelectItem value="master">{t('fields.program.options.engineering')}</SelectItem>
                              <SelectItem value="phd">{t('fields.program.options.other')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          {t('actions.submit')}
                        </span>
                      ) : (
                        t('actions.submit')
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

export default ApplicationFormModal 