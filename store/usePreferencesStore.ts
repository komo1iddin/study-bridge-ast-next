"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Lang = 'uz' | 'ru' | 'en'
export type FontSize = 'small' | 'medium' | 'large'

interface PreferencesState {
	language: Lang
	fontSize: FontSize
	reducedMotion: boolean
	setLanguage: (language: Lang) => void
	setFontSize: (fontSize: FontSize) => void
	setReducedMotion: (reducedMotion: boolean) => void
}

export const usePreferencesStore = create<PreferencesState>()(
	persist(
		(set) => ({
			language: 'uz',
			fontSize: 'medium',
			reducedMotion: false,
			setLanguage: (language) => set({ language }),
			setFontSize: (fontSize) => set({ fontSize }),
			setReducedMotion: (reducedMotion) => set({ reducedMotion }),
		}),
		{
			name: 'user-preferences',
		}
	)
)