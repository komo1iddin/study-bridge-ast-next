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

import universityFeatureEn from './components/university-feature/en.json';
import universityFeatureRu from './components/university-feature/ru.json';
import universityFeatureUz from './components/university-feature/uz.json';

// Import page translations
import homeEn from './pages/home/en.json';
import homeRu from './pages/home/ru.json';
import homeUz from './pages/home/uz.json';

import whyChinaEn from './pages/why-china/en.json';
import whyChinaRu from './pages/why-china/ru.json';
import whyChinaUz from './pages/why-china/uz.json';

import programsEn from './pages/programs/en.json';
import programsRu from './pages/programs/ru.json';
import programsUz from './pages/programs/uz.json';

import universitiesEn from './pages/universities/en.json';
import universitiesRu from './pages/universities/ru.json';
import universitiesUz from './pages/universities/uz.json';

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
    universityFeature: universityFeatureEn,
    common: commonEn,
    home: homeEn,
    whyChina: whyChinaEn,
    programs: programsEn,
    universities: universitiesEn,
    // Add other sections as they're created
  },
  ru: {
    navbar: navbarRu,
    footer: footerRu,
    contactForm: contactFormRu,
    faq: faqRu,
    universityFeature: universityFeatureRu,
    common: commonRu,
    home: homeRu,
    whyChina: whyChinaRu,
    programs: programsRu,
    universities: universitiesRu,
    // Add other sections as they're created
  },
  uz: {
    navbar: navbarUz,
    footer: footerUz,
    contactForm: contactFormUz,
    faq: faqUz,
    universityFeature: universityFeatureUz,
    common: commonUz,
    home: homeUz,
    whyChina: whyChinaUz,
    programs: programsUz,
    universities: universitiesUz,
    // Add other sections as they're created
  },
};

export default messages; 