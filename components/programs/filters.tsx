"use client"

import { Search } from "lucide-react"
import { useTranslations } from "next-intl"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FiltersProps {
  className?: string
  onSearch?: (value: string) => void
  onCategoryChange?: (value: string) => void
  onLevelChange?: (value: string) => void
  onLanguageChange?: (value: string) => void
}

export function Filters({ 
  className, 
  onSearch, 
  onCategoryChange, 
  onLevelChange, 
  onLanguageChange 
}: FiltersProps) {
  const t = useTranslations("programs.filters")
  
  return (
    <section className={`w-full py-8 border-b ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-2">
            <label
              htmlFor="search"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("search.label")}
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                id="search" 
                type="search" 
                placeholder={t("search.placeholder")} 
                className="pl-8" 
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("category.label")}
            </label>
            <Select defaultValue="all" onValueChange={onCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder={t("category.all")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("category.all")}</SelectItem>
                <SelectItem value="business">{t("category.business")}</SelectItem>
                <SelectItem value="it">{t("category.it")}</SelectItem>
                <SelectItem value="medicine">{t("category.medicine")}</SelectItem>
                <SelectItem value="engineering">{t("category.engineering")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="level"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("level.label")}
            </label>
            <Select defaultValue="all" onValueChange={onLevelChange}>
              <SelectTrigger id="level">
                <SelectValue placeholder={t("level.all")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("level.all")}</SelectItem>
                <SelectItem value="bachelor">{t("level.bachelor")}</SelectItem>
                <SelectItem value="master">{t("level.master")}</SelectItem>
                <SelectItem value="phd">{t("level.phd")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="language"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("language.label")}
            </label>
            <Select defaultValue="all" onValueChange={onLanguageChange}>
              <SelectTrigger id="language">
                <SelectValue placeholder={t("language.all")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("language.all")}</SelectItem>
                <SelectItem value="english">{t("language.english")}</SelectItem>
                <SelectItem value="chinese">{t("language.chinese")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  )
} 