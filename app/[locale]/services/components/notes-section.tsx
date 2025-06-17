"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { AlertCircle, AlertTriangle, Info, HelpCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import SectionHeader from "@/components/ui/section-header"
import { cn } from "@/lib/utils"

interface NotesSectionProps {
  hideHeader?: boolean
}

type NoteData = { icon: React.ElementType; type: "warning" | "info" | "default" | "destructive"; title: string; description: string }
const NOTES: NoteData[] = [
    { 
      icon: AlertCircle, 
      type: "warning",
      title: "programRestriction",
      description: "program1Plus4" 
    },
    { 
      icon: Info, 
      type: "info",
      title: "visaInfo",
      description: "visaDetails" 
    },
    { 
      icon: HelpCircle, 
      type: "default",
      title: "accommodationInfo",
      description: "accommodationDetails" 
    },
    { 
      icon: AlertTriangle, 
      type: "destructive",
      title: "importantDeadlines",
      description: "deadlineDetails" 
    }
  ]
  
export function NotesSection({ hideHeader = false }: NotesSectionProps) {
  const t = useTranslations("pages.services.notesSection")
  
  return (
    <section id="notes" className="py-12 md:py-16 lg:py-20">
      {!hideHeader && (
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          alignment="center"
        />
      )}
      
      <div className="space-y-8 mt-10">
        {NOTES.map((note, index) => (
          <motion.div
            key={note.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <Alert 
              variant={note.type as any} 
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="flex gap-3 items-start">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  note.type === "warning" ? "bg-amber-100 text-amber-600" :
                  note.type === "destructive" ? "bg-red-100 text-red-600" :
                  note.type === "info" ? "bg-blue-100 text-blue-600" :
                  "bg-slate-100 text-slate-600"
                )}>
                  <note.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <AlertTitle className="text-lg font-semibold mb-2">
                    {t(`${note.title}.title`)}
                  </AlertTitle>
                  <AlertDescription className="text-muted-foreground">
                    {t(`${note.title}.description`)}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </motion.div>
        ))}
        
        {/* Removed highlighted duplication; programRestriction note already emphasized via variant */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-14"
          whileHover={{ scale: 1.02 }}
        >
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-8 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-100 rounded-full opacity-50"></div>
            <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-amber-100 rounded-full opacity-30"></div>
            
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 h-16 w-16 rounded-full flex items-center justify-center shadow-inner border border-amber-200">
                <AlertCircle className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <span className="inline-block bg-amber-200/70 text-amber-800 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-2">
                  {t("important")}
                </span>
                <h3 className="text-xl font-bold text-amber-900">{t("restriction.title")}</h3>
              </div>
            </div>
            
            <div className="mt-6 pl-20">
              <p className="text-amber-800 text-lg font-medium leading-relaxed">
                {t("restriction.description")}
              </p>
              <div className="mt-4 flex items-center gap-2 text-amber-700">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">{t("restrictionNote")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}