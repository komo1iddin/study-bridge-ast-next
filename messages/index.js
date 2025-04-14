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

// Import home components translations
import ourTeamEn from './pages/home/components/ourTeam/en.json';
import ourTeamRu from './pages/home/components/ourTeam/ru.json';
import ourTeamUz from './pages/home/components/ourTeam/uz.json';

import ourPartnersEn from './pages/home/components/ourPartners/en.json';
import ourPartnersRu from './pages/home/components/ourPartners/ru.json';
import ourPartnersUz from './pages/home/components/ourPartners/uz.json';

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
    pages: {
      home: {
        ...homeEn,
        components: {
          ourTeam: ourTeamEn,
          ourPartners: ourPartnersEn
        }
      },
      whyChina: whyChinaEn,
      programs: programsEn,
      universities: universitiesEn,
    }
  },
  ru: {
    navbar: navbarRu,
    footer: footerRu,
    contactForm: contactFormRu,
    faq: faqRu,
    universityFeature: universityFeatureRu,
    common: commonRu,
    pages: {
      home: {
        ...homeRu,
        components: {
          ourTeam: ourTeamRu,
          ourPartners: ourPartnersRu
        }
      },
      whyChina: whyChinaRu,
      programs: programsRu,
      universities: universitiesRu,
    }
  },
  uz: {
    navbar: navbarUz,
    footer: footerUz,
    contactForm: contactFormUz,
    faq: faqUz,
    universityFeature: universityFeatureUz,
    common: commonUz,
    pages: {
      home: {
        ...homeUz,
        components: {
          ourTeam: ourTeamUz,
          ourPartners: ourPartnersUz
        }
      },
      whyChina: whyChinaUz,
      programs: programsUz,
      universities: universitiesUz,
    }
  },
};

export default messages; 