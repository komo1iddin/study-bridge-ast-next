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

// Import new home component translations
import heroEn from './pages/home/components/hero/en.json';
import heroRu from './pages/home/components/hero/ru.json';
import heroUz from './pages/home/components/hero/uz.json';

import metadataEn from './pages/home/components/metadata/en.json';
import metadataRu from './pages/home/components/metadata/ru.json';
import metadataUz from './pages/home/components/metadata/uz.json';

import howWeWorkEn from './pages/home/components/howWeWork/en.json';
import howWeWorkRu from './pages/home/components/howWeWork/ru.json';
import howWeWorkUz from './pages/home/components/howWeWork/uz.json';

import testimonialsEn from './pages/home/components/testimonials/en.json';
import testimonialsRu from './pages/home/components/testimonials/ru.json';
import testimonialsUz from './pages/home/components/testimonials/uz.json';

import whyChinaCompEn from './pages/home/components/whyChina/en.json';
import whyChinaCompRu from './pages/home/components/whyChina/ru.json';
import whyChinaCompUz from './pages/home/components/whyChina/uz.json';

import servicesEn from './pages/home/components/services/en.json';
import servicesRu from './pages/home/components/services/ru.json';
import servicesUz from './pages/home/components/services/uz.json';

import universitiesCompEn from './pages/home/components/universities/en.json';
import universitiesCompRu from './pages/home/components/universities/ru.json';
import universitiesCompUz from './pages/home/components/universities/uz.json';

import successPathEn from './pages/home/components/successPath/en.json';
import successPathRu from './pages/home/components/successPath/ru.json';
import successPathUz from './pages/home/components/successPath/uz.json';

import ctaEn from './pages/home/components/cta/en.json';
import ctaRu from './pages/home/components/cta/ru.json';
import ctaUz from './pages/home/components/cta/uz.json';

import missionStatsEn from './pages/home/components/missionStats/en.json';
import missionStatsRu from './pages/home/components/missionStats/ru.json';
import missionStatsUz from './pages/home/components/missionStats/uz.json';

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
        metadata: metadataEn,
        hero: heroEn,
        howWeWork: howWeWorkEn,
        missionStats: missionStatsEn,
        testimonials: testimonialsEn,
        whyChina: whyChinaCompEn,
        services: servicesEn,
        universities: universitiesCompEn,
        successPath: successPathEn,
        cta: ctaEn,
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
        metadata: metadataRu,
        hero: heroRu,
        howWeWork: howWeWorkRu,
        missionStats: missionStatsRu,
        testimonials: testimonialsRu,
        whyChina: whyChinaCompRu,
        services: servicesRu,
        universities: universitiesCompRu,
        successPath: successPathRu,
        cta: ctaRu,
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
        metadata: metadataUz,
        hero: heroUz,
        howWeWork: howWeWorkUz,
        missionStats: missionStatsUz,
        testimonials: testimonialsUz,
        whyChina: whyChinaCompUz,
        services: servicesUz,
        universities: universitiesCompUz,
        successPath: successPathUz,
        cta: ctaUz,
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