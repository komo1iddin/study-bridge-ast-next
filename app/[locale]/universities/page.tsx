import React from 'react'
import { getTranslations } from 'next-intl/server'
import { UniversityPage } from '@/components/universities'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getContentItems } from '@/lib/decap-cms'
import { University } from '@/types/content'

// This function will try to load universities from Decap CMS content directory
// If no content is found yet, it will fallback to sample data
async function getUniversities(locale: string): Promise<University[]> {
  // Try to get universities from Decap CMS
  const cmsUniversities = getContentItems<University>('universities', locale);
  
  // If we have CMS data, return it
  if (cmsUniversities && cmsUniversities.length > 0) {
    return cmsUniversities;
  }
  
  // Otherwise return sample data
  return SAMPLE_UNIVERSITIES;
}

// Sample data as fallback before CMS content is created
const SAMPLE_UNIVERSITIES = [
  {
    id: 1,
    name: "Peking University",
    logo: "/universities/peking.jpg",
    image: "/universities/peking-campus.jpg",
    city: "Beijing",
    description: "One of China's most prestigious educational institutions, offering a wide range of programs for international students with a beautiful campus in the heart of Beijing.",
    educationType: ["bachelor", "master", "1+2"],
    hasGrants: true,
    featured: true,
    ranking: 1,
    foundedYear: 1898,
    studentsCount: 42000,
    internationalStudents: 3000,
    slug: "peking-university"
  },
  {
    id: 2,
    name: "Tsinghua University",
    logo: "/universities/tsinghua.jpg",
    image: "/universities/tsinghua-campus.jpg",
    city: "Beijing",
    description: "A leading research institution known for its science and engineering programs, offering comprehensive education with modern facilities and strong international connections.",
    educationType: ["bachelor", "master"],
    hasGrants: true,
    featured: true,
    ranking: 2,
    foundedYear: 1911,
    studentsCount: 36000,
    internationalStudents: 2500,
    slug: "tsinghua-university"
  },
  {
    id: 3,
    name: "Fudan University",
    logo: "/universities/fudan.jpg",
    image: "/universities/fudan-campus.jpg",
    city: "Shanghai",
    description: "One of China's most selective universities with strengths in humanities, social sciences, and medicine, offering an international environment in the heart of Shanghai.",
    educationType: ["bachelor", "master", "language"],
    hasGrants: true,
    featured: false,
    ranking: 3,
    foundedYear: 1905,
    studentsCount: 33000,
    internationalStudents: 3000,
    slug: "fudan-university"
  },
  {
    id: 4,
    name: "Zhejiang University",
    logo: "/universities/zhejiang.jpg",
    image: "/universities/zhejiang-campus.jpg",
    city: "Hangzhou",
    description: "A top-tier comprehensive university with a beautiful campus in Hangzhou, known for research and innovation across multiple disciplines.",
    educationType: ["bachelor", "master"],
    hasGrants: true,
    featured: false,
    ranking: 4,
    foundedYear: 1897,
    studentsCount: 54000,
    internationalStudents: 3500,
    slug: "zhejiang-university"
  },
  {
    id: 5,
    name: "Shanghai Jiao Tong University",
    logo: "/universities/sjtu.jpg",
    image: "/universities/sjtu-campus.jpg",
    city: "Shanghai",
    description: "One of the oldest and most prestigious universities in China with strengths in engineering, medicine, and business, offering extensive programs for international students.",
    educationType: ["bachelor", "master", "1+2"],
    hasGrants: true,
    featured: false,
    ranking: 5,
    foundedYear: 1896,
    studentsCount: 38000,
    internationalStudents: 2800,
    slug: "shanghai-jiao-tong-university"
  },
  {
    id: 6,
    name: "Nanjing University",
    logo: "/universities/nanjing.jpg",
    image: "/universities/nanjing-campus.jpg",
    city: "Nanjing",
    description: "A historic institution with a modern approach to education, offering programs in liberal arts, sciences, and engineering in the culturally rich city of Nanjing.",
    educationType: ["bachelor", "master", "language"],
    hasGrants: false,
    featured: false,
    ranking: 8,
    foundedYear: 1902,
    studentsCount: 33000,
    internationalStudents: 2000,
    slug: "nanjing-university"
  },
  {
    id: 7,
    name: "Wuhan University",
    logo: "/universities/wuhan.jpg",
    image: "/universities/wuhan-campus.jpg",
    city: "Wuhan",
    description: "Known for its beautiful campus and comprehensive academic programs, offering a vibrant student life and strong support for international students.",
    educationType: ["bachelor", "master"],
    hasGrants: true,
    featured: false,
    ranking: 11,
    foundedYear: 1893,
    studentsCount: 50000,
    internationalStudents: 3200,
    slug: "wuhan-university"
  },
  {
    id: 8,
    name: "Xiamen University",
    logo: "/universities/xiamen.jpg",
    image: "/universities/xiamen-campus.jpg",
    city: "Xiamen",
    description: "Located in the coastal city of Xiamen, this university offers a beautiful campus environment with strong programs in business, economics, and Chinese language.",
    educationType: ["bachelor", "language"],
    hasGrants: false,
    featured: false,
    ranking: 24,
    foundedYear: 1921,
    studentsCount: 40000,
    internationalStudents: 2500,
    slug: "xiamen-university"
  }
];

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