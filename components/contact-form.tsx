"use client"

import { useState, useCallback, memo } from "react"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ErrorBoundary } from "./error-boundary"

const ContactForm = () => {
  const t = useTranslations("home.contact")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Define form schema with validation
  const formSchema = z.object({
    name: z.string().min(2, {
      message: t("errors.nameRequired"),
    }),
    email: z.string().email({
      message: t("errors.emailInvalid"),
    }),
    phone: z.string().min(5, {
      message: t("errors.phoneInvalid"),
    }),
    message: z.string().min(10, {
      message: t("errors.messageTooShort"),
    }),
  })

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  // Memoize the submit handler for better performance
  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log(values)
      
      toast({
        title: t("formSuccess"),
        description: t("formSuccessMessage"),
      })
      
      form.reset()
    } catch (error) {
      toast({
        title: t("formError"),
        description: t("formErrorMessage"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [form, t])

  return (
    <ErrorBoundary>
      <div className="mx-auto max-w-md space-y-6 p-6 bg-card rounded-lg shadow-sm">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">{t("title")}</h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" aria-label={t("formAriaLabel")}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("nameLabel")}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("namePlaceholder")} 
                      {...field} 
                      aria-required="true"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("emailLabel")}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("emailPlaceholder")} 
                      type="email" 
                      {...field} 
                      aria-required="true"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("phoneLabel")}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("phonePlaceholder")} 
                      type="tel" 
                      {...field} 
                      aria-required="true"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("messageLabel")}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t("messagePlaceholder")} 
                      className="min-h-[120px]" 
                      {...field} 
                      aria-required="true"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? t("submitting") : t("submit")}
            </Button>
          </form>
        </Form>
      </div>
    </ErrorBoundary>
  )
}

export default memo(ContactForm) 