"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { usePreferencesStore } from "@/store/usePreferencesStore"
import { useCallback } from "react"

export default function LanguageSwitcher() {
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const { setLanguage } = usePreferencesStore()

	// Using useCallback for better performance
	const switchLocale = useCallback((newLocale: string) => {
		// Update the Zustand store
		setLanguage(newLocale as any)
		
		// Navigate to the new locale
		const newPath = `/${newLocale}${pathname.substring(3)}`
		router.replace(newPath)
	}, [pathname, router, setLanguage])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" aria-label="Switch language">
					<Globe className="h-5 w-5" />
					<span className="sr-only">Switch language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem 
					onClick={() => switchLocale("uz")} 
					className={locale === "uz" ? "bg-muted" : ""}
					role="menuitem"
					tabIndex={0}
				>
					O'zbekcha
				</DropdownMenuItem>
				<DropdownMenuItem 
					onClick={() => switchLocale("ru")} 
					className={locale === "ru" ? "bg-muted" : ""}
					role="menuitem"
					tabIndex={0}
				>
					Русский
				</DropdownMenuItem>
				<DropdownMenuItem 
					onClick={() => switchLocale("en")} 
					className={locale === "en" ? "bg-muted" : ""}
					role="menuitem"
					tabIndex={0}
				>
					English
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
