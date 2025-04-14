"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Lang = 'uz' | 'ru' | 'en'
export type Theme = 'light' | 'dark' | 'system'
export type FontSize = 'small' | 'medium' | 'large'

interface PreferencesState {
	language: Lang
	theme: Theme
	fontSize: FontSize
	reducedMotion: boolean
	setLanguage: (language: Lang) => void
	setTheme: (theme: Theme) => void
	setFontSize: (fontSize: FontSize) => void
	setReducedMotion: (reducedMotion: boolean) => void
}

export const usePreferencesStore = create<PreferencesState>()(
	persist(
		(set) => ({
			language: 'uz',
			theme: 'system',
			fontSize: 'medium',
			reducedMotion: false,
			setLanguage: (language) => set({ language }),
			setTheme: (theme) => set({ theme }),
			setFontSize: (fontSize) => set({ fontSize }),
			setReducedMotion: (reducedMotion) => set({ reducedMotion }),
		}),
		{
			name: 'user-preferences',
		}
	)
) 