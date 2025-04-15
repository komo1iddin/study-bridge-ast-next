import React from 'react'
import { getTranslations } from 'next-intl/server'
import { UniversityPage } from '@/components/universities'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getContentItems } from '@/lib/decap-cms'
import { University } from '@/types/content'


async function getUniversities(locale: string): Promise<University[]> {
  // Try to get universities from Decap CMS
  const cmsUniversities = getContentItems<University>('universities', locale);
  
  // Only return CMS data
  return cmsUniversities;
}

// Function to extract unique cities from universities
function extractCities(universities: University[]): string[] {
  const citySet = new Set<string>();
  
  universities.forEach(university => {
    if (university.city) {
      citySet.add(university.city);
    }
  });
  
  return Array.from(citySet);
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'pages.universities' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function UniversitiesPage({ params }: { params: { locale: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const universities = await getUniversities(resolvedParams.locale);
  const cities = extractCities(universities);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <UniversityPage 
        universities={universities}
        cities={cities}
      />
      <Footer />
    </div>
  );
} 