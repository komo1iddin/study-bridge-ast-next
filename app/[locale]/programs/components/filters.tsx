"use client"

import { Search } from "lucide-react"
import { useTranslations } from "next-intl"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FiltersProps {
  className?: string
  onSearchChange?: (value: string) => void
  onCategoryChange?: (value: string) => void
  onLevelChange?: (value: string) => void
  onLanguageChange?: (value: string) => void
}

export function Filters({ 
  className, 
  onSearchChange, 
  onCategoryChange, 
  onLevelChange, 
  onLanguageChange 
}: FiltersProps) {
  const t = useTranslations("pages.programs")
  
  return (
    <section className={`w-full py-8 border-b ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-2">
            <label
              htmlFor="search"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("filters.search.label")}
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                id="search" 
                type="search" 
                placeholder={t("filters.search.placeholder")} 
                className="pl-8" 
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("filters.category.label")}
            </label>
            <Select defaultValue="all" onValueChange={onCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder={t("filters.category.all")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filters.category.all")}</SelectItem>
                <SelectItem value="business">{t("filters.category.business")}</SelectItem>
                <SelectItem value="it">{t("filters.category.it")}</SelectItem>
                <SelectItem value="medicine">{t("filters.category.medicine")}</SelectItem>
                <SelectItem value="engineering">{t("filters.category.engineering")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="level"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("filters.level.label")}
            </label>
            <Select defaultValue="all" onValueChange={onLevelChange}>
              <SelectTrigger id="level">
                <SelectValue placeholder={t("filters.level.all")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filters.level.all")}</SelectItem>
                <SelectItem value="bachelor">{t("filters.level.bachelor")}</SelectItem>
                <SelectItem value="master">{t("filters.level.master")}</SelectItem>
                <SelectItem value="phd">{t("filters.level.phd")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="language"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("filters.language.label")}
            </label>
            <Select defaultValue="all" onValueChange={onLanguageChange}>
              <SelectTrigger id="language">
                <SelectValue placeholder={t("filters.language.all")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filters.language.all")}</SelectItem>
                <SelectItem value="english">{t("filters.language.english")}</SelectItem>
                <SelectItem value="chinese">{t("filters.language.chinese")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  )
} 