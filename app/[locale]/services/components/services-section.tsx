"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { FileText, Database, MessageCircle, School, Mail, Plane, Map, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import SectionHeader from "@/components/ui/section-header"

interface ServiceCardProps {
  icon: React.ElementType
  title: string
  description: string
  index: number
}

interface ServicesSectionProps {
  hideHeader?: boolean
}

// Static services data moved outside component
type ServiceData = { icon: React.ElementType; key: string }
const SERVICES: ServiceData[] = [
  { icon: FileText, key: "consultation" },
  { icon: Database, key: "offerDatabase" },
  { icon: FileText, key: "documentReview" },
  { icon: School, key: "universityApplication" },
  { icon: MessageCircle, key: "communication" },
  { icon: Mail, key: "admissionLetter" },
  { icon: Plane, key: "preDeparture" },
  { icon: Calendar, key: "afterArrival" }
]

export function ServicesSection({ hideHeader = false }: ServicesSectionProps) {
  const t = useTranslations("pages.services.servicesSection")
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  return (
    <section id="services" className="py-6 md:py-8 mb-10">
      {!hideHeader && (
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          badge={t("badge")}
          alignment="center"
        />
      )}
      
      <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.key}
            icon={service.icon}
            title={t(`services.${service.key}.title`)}
            description={t(`services.${service.key}.description`)}
            index={index}
          />
        ))}
      </motion.div>
    </section>
  )
}

function ServiceCard({ icon: Icon, title, description, index }: ServiceCardProps) {
  // Create a gradient based on the index
  const gradients = [
    "from-blue-50 to-indigo-50",
    "from-purple-50 to-pink-50",
    "from-amber-50 to-orange-50",
    "from-green-50 to-teal-50",
    "from-sky-50 to-cyan-50",
    "from-indigo-50 to-violet-50",
    "from-rose-50 to-red-50",
    "from-emerald-50 to-green-50",
  ]
  
  const iconColors = [
    "text-blue-600",
    "text-purple-600", 
    "text-amber-600",
    "text-green-600",
    "text-sky-600",
    "text-indigo-600",
    "text-rose-600",
    "text-emerald-600"
  ]
  
  const borderColors = [
    "border-blue-200",
    "border-purple-200",
    "border-amber-200",
    "border-green-200",
    "border-sky-200",
    "border-indigo-200",
    "border-rose-200",
    "border-emerald-200"
  ]

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.2 }
        }
      }}
      className={cn(
        "group relative flex flex-col items-start gap-4 rounded-2xl p-8 bg-gradient-to-br border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1",
        gradients[index % gradients.length],
        borderColors[index % borderColors.length]
      )}
    >
      <div className="space-y-4 w-full">
        <div className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm",
          "ring-1 ring-inset ring-gray-100/50"
        )}>
          <Icon className={cn("h-7 w-7", iconColors[index % iconColors.length])} />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}