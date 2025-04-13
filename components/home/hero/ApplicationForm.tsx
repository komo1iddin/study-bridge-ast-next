'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

interface ApplicationFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const FormField = ({ 
  id, 
  label, 
  type = "text", 
  placeholder, 
  delay 
}: { 
  id: string
  label: string
  type?: string
  placeholder: string
  delay: number
}) => (
  <motion.div 
    className={cn('grid gap-2')}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
  >
    <Label htmlFor={id}>{label}</Label>
    <Input 
      id={id} 
      type={type} 
      required 
      placeholder={placeholder}
    />
  </motion.div>
)

const ApplicationForm = ({ open, onOpenChange }: ApplicationFormProps) => {
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual form submission logic (e.g., API call)
    toast({
      title: 'Заявка отправлена!',
      description: 'Наш специалист свяжется с вами в ближайшее время.'
    })
    onOpenChange(false)
  }

  const overlayVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  }

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { 
        duration: 0.2,
        ease: "easeIn"  
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
                  <DialogTitle>Оставьте вашу заявку</DialogTitle>
                  <DialogDescription>
                    Заполните форму, и наш консультант свяжется с вами в ближайшее время.
                  </DialogDescription>
                </motion.div>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className={cn('grid gap-4 py-4')}>
                  <FormField 
                    id="name" 
                    label="Имя" 
                    placeholder="Введите ваше имя"
                    delay={0.2}
                  />
                  <FormField 
                    id="phone" 
                    label="Телефон" 
                    type="tel"
                    placeholder="+998 XX XXX XX XX"
                    delay={0.3}
                  />
                  <FormField 
                    id="email" 
                    label="Email" 
                    type="email"
                    placeholder="ваш@email.com"
                    delay={0.4}
                  />
                </div>
                <DialogFooter>
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className={cn('bg-primary hover:bg-primary/90 w-full')}
                    >
                      Отправить заявку
                    </Button>
                  </motion.div>
                </DialogFooter>
              </form>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

export default ApplicationForm 