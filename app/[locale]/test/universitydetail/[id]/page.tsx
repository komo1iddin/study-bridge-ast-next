import { UniversityDetailPage } from "@/app/[locale]/universities/[slug]/components/university-detail-page"

// Mock university data for testing
const mockUniversity = {
  id: "1",
  name: "Beijing University of Technology",
  logo: "/universities/beijing-tech.png",
  image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  city: "Beijing",
  description: "Beijing University of Technology is a comprehensive research university located in the capital of China. It offers various undergraduate and graduate programs focusing on engineering, science, economics, management, humanities, law, and education.",
  educationType: ["Bachelor", "Master", "PhD"],
  hasGrants: true,
  featured: true,
  ranking: 25,
  foundedYear: 1960,
  studentsCount: 25000,
  internationalStudents: 2500
}

interface PageProps {
  params: { id: string }
}

export default function UniversityPage({ params }: PageProps) {
  // In a real app, this would fetch the university data based on the ID
  // const university = await getUniversityById(params.id)
  
  return (
    <div>
      <UniversityDetailPage university={mockUniversity} lang="en" />
    </div>
  )
} 