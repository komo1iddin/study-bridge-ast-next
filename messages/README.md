# Modular Translation System

This directory contains the internationalization (i18n) files for our application. We use a modular approach to manage translations.

## Directory Structure

```
messages/
├── index.js             # Combines all translations
├── components/          # Component-specific translations 
│   ├── navbar/          # Navbar component translations
│   │   ├── en.json
│   │   ├── ru.json
│   │   └── uz.json
│   └── other-component/ # Other component translations
├── pages/               # Page-specific translations
│   ├── home/
│   │   ├── en.json
│   │   ├── ru.json
│   │   └── uz.json
│   └── other-page/      # Other page translations
└── common/              # Common translations shared across the app
    ├── en.json
    ├── ru.json
    └── uz.json
```

## How to Add New Translations

1. **For a new component**:
   - Create a new folder under `components/` with your component name
   - Add language files (en.json, ru.json, uz.json) in that folder
   - Import and add them to `index.js`

2. **For a new page**:
   - Create a new folder under `pages/` with your page name
   - Add language files (en.json, ru.json, uz.json) in that folder
   - Import and add them to `index.js`

3. **For common translations**:
   - Add them to the appropriate file in the `common/` directory

## Usage in Components

```tsx
// In your component
"use client";
import { useTranslations } from 'next-intl';

export function MyComponent() {
  // Specify the namespace for your component
  const t = useTranslations('navbar');
  
  return <div>{t('someKey')}</div>;
}
```

## Benefits of This Approach

- **Modularity**: Translations are organized by feature, making them easier to manage
- **Scalability**: Easy to add new features without large translation files
- **Maintenance**: Changes to one feature don't affect others
- **Collaboration**: Multiple developers can work on different features without conflicts 