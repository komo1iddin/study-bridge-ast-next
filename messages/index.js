// Import all component translations
import navbarEn from './components/navbar/en.json';
import navbarRu from './components/navbar/ru.json';
import navbarUz from './components/navbar/uz.json';

import footerEn from './components/footer/en.json';
import footerRu from './components/footer/ru.json';
import footerUz from './components/footer/uz.json';

import contactFormEn from './components/contact-form/en.json';
import contactFormRu from './components/contact-form/ru.json';
import contactFormUz from './components/contact-form/uz.json';

import faqEn from './components/faq/en.json';
import faqRu from './components/faq/ru.json';
import faqUz from './components/faq/uz.json';

// Import common translations
import commonEn from './common/en.json';
import commonRu from './common/ru.json';
import commonUz from './common/uz.json';

// Combine all translations
export const messages = {
  en: {
    navbar: navbarEn,
    footer: footerEn,
    contactForm: contactFormEn,
    faq: faqEn,
    common: commonEn,
    // home: homeEn,
    // Add other sections as they're created
  },
  ru: {
    navbar: navbarRu,
    footer: footerRu,
    contactForm: contactFormRu,
    faq: faqRu,
    common: commonRu,
    // home: homeRu,
    // Add other sections as they're created
  },
  uz: {
    navbar: navbarUz,
    footer: footerUz,
    contactForm: contactFormUz,
    faq: faqUz,
    common: commonUz,
    // home: homeUz,
    // Add other sections as they're created
  },
};

export default messages; 