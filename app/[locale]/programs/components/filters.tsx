"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { useTranslations } from "next-intl"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

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
  const [isOpen, setIsOpen] = useState(false)
  
  // Filter component that adapts based on whether it's in mobile drawer or desktop view
  const FilterControls = ({ inDrawer = false }) => (
    <div className={inDrawer ? "space-y-6" : "grid gap-6 md:grid-cols-4"}>
      <div className="space-y-2">
        <label
          htmlFor={inDrawer ? "mobile-search" : "search"}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("filters.search.label")}
        </label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            id={inDrawer ? "mobile-search" : "search"} 
            type="search" 
            placeholder={t("filters.search.placeholder")} 
            className="pl-8" 
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor={inDrawer ? "mobile-category" : "category"}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("filters.category.label")}
        </label>
        <Select defaultValue="all" onValueChange={(v) => {
          onCategoryChange?.(v)
          if (inDrawer && isOpen) setIsOpen(false)
        }}>
          <SelectTrigger id={inDrawer ? "mobile-category" : "category"}>
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
          htmlFor={inDrawer ? "mobile-level" : "level"}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("filters.level.label")}
        </label>
        <Select defaultValue="all" onValueChange={(v) => {
          onLevelChange?.(v)
          if (inDrawer && isOpen) setIsOpen(false)
        }}>
          <SelectTrigger id={inDrawer ? "mobile-level" : "level"}>
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
          htmlFor={inDrawer ? "mobile-language" : "language"}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("filters.language.label")}
        </label>
        <Select defaultValue="all" onValueChange={(v) => {
          onLanguageChange?.(v)
          if (inDrawer && isOpen) setIsOpen(false) 
        }}>
          <SelectTrigger id={inDrawer ? "mobile-language" : "language"}>
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
  )
  
  return (
    <section className={`w-full py-8 border-b ${className || ""}`}>
      <div className="container px-4 md:px-6">
        {/* Mobile filters */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {t("filters.mobileButtonLabel") || "Filters"}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
              <SheetHeader>
                <SheetTitle>{t("filters.mobileTitle") || "Filter Programs"}</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <FilterControls inDrawer={true} />
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button className="w-full" onClick={() => setIsOpen(false)}>
                    <X className="mr-2 h-4 w-4" />
                    {t("filters.closeButton") || "Close"}
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          {/* Minimal search shown persistently on mobile */}
          <div className="relative flex-1 ml-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder={t("filters.search.placeholder")} 
              className="pl-8 h-9" 
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        </div>
        
        {/* Desktop filters */}
        <div className="hidden md:block">
          <FilterControls />
        </div>
      </div>
    </section>
  )
} 