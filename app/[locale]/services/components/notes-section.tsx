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

type NoteData = { icon: React.ElementType; type: "warning" | "info" | "default" | "destructive"; key: string }
const NOTES: NoteData[] = [
    { 
      icon: AlertCircle, 
      type: "warning",
      key: "programRestriction" 
    },
    { 
      icon: Info, 
      type: "info",
      key: "visaInfo" 
    },
    { 
      icon: HelpCircle, 
      type: "default",
      key: "accommodationInfo" 
    },
    { 
      icon: AlertTriangle, 
      type: "destructive",
      key: "importantDeadlines"
    }
  ]
  
export function NotesSection({ hideHeader = false }: NotesSectionProps) {
  const t = useTranslations("pages.services.notesSection")
  
  return (
    <section id="notes" className="py-6 md:py-8 mb-10">
      {!hideHeader && (
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          alignment="center"
        />
      )}
      
      <div className="grid gap-6 md:grid-cols-2">
        {NOTES.map((note) => (
          <div
            key={note.key}
            className={cn(
              "p-5 rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1",
              note.type === "warning" ? "bg-amber-50 border-amber-200" :
              note.type === "destructive" ? "bg-red-50 border-red-200" :
              note.type === "info" ? "bg-blue-50 border-blue-200" :
              "bg-slate-50 border-slate-200"
            )}
          >
            <div className="flex gap-4">
              <div className={cn(
                "flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full",
                note.type === "warning" ? "bg-amber-100 text-amber-600" :
                note.type === "destructive" ? "bg-red-100 text-red-600" :
                note.type === "info" ? "bg-blue-100 text-blue-600" :
                "bg-slate-100 text-slate-600"
              )}>
                <note.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t(`${note.key}.title`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`${note.key}.description`)}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Important notice - spans full width */}
        <div className="md:col-span-2 mt-4">
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 p-6 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 bg-amber-100 rounded-full shadow border border-amber-200">
                <AlertCircle className="h-8 w-8 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                    {t("important")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">{t("restriction.title")}</h3>
                <p className="text-amber-800 text-lg font-medium">
                  {t("restriction.description")}
                </p>
                <div className="mt-3 flex items-center gap-2 text-amber-700">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-sm">{t("restrictionNote")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}