// Import all component translations
import navbarEn from './components/navbar/en.json';
import navbarRu from './components/navbar/ru.json';
import navbarUz from './components/navbar/uz.json';

// Combine all translations
export const messages = {
  en: {
    navbar: navbarEn,
    // home: homeEn,
    // Add other sections as they're created
  },
  ru: {
    navbar: navbarRu,
    // home: homeRu,
    // Add other sections as they're created
  },
  uz: {
    navbar: navbarUz,
    // home: homeUz,
    // Add other sections as they're created
  },
};

export default messages; 