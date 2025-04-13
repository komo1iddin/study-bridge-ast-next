"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Linkedin, Phone } from "lucide-react"
import { memo, useCallback } from "react"
import { ErrorBoundary } from "./error-boundary"

interface TeamMember {
  id: number
  name: string
  position: string
  image: string
  email: string
  phone: string
  linkedin: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alisher Karimov",
    position: "director",
    image: "/placeholder.svg?height=300&width=300",
    email: "alisher@educhina.uz",
    phone: "+998 90 123 45 67",
    linkedin: "https://linkedin.com",
  },
  {
    id: 2,
    name: "Malika Rakhimova",
    position: "consultant",
    image: "/placeholder.svg?height=300&width=300",
    email: "malika@educhina.uz",
    phone: "+998 90 123 45 68",
    linkedin: "https://linkedin.com",
  },
  {
    id: 3,
    name: "Timur Azimov",
    position: "manager",
    image: "/placeholder.svg?height=300&width=300",
    email: "timur@educhina.uz",
    phone: "+998 90 123 45 69",
    linkedin: "https://linkedin.com",
  },
  {
    id: 4,
    name: "Dilnoza Usmanova",
    position: "coordinator",
    image: "/placeholder.svg?height=300&width=300",
    email: "dilnoza@educhina.uz",
    phone: "+998 90 123 45 70",
    linkedin: "https://linkedin.com",
  },
]

// Memoized TeamMemberCard component for performance
const TeamMemberCard = memo(({ member, positionLabel }: { member: TeamMember, positionLabel: string }) => {
  return (
    <Card key={member.id} className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={member.image || "/placeholder.svg"}
          alt={`Photo of ${member.name}`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{member.name}</h3>
        <p className="text-sm text-blue-600">{positionLabel}</p>
        <div className="mt-4 flex justify-center space-x-3">
          <a
            href={`mailto:${member.email}`}
            className="text-gray-500 hover:text-blue-600 transition-colors"
            aria-label={`Email ${member.name}`}
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href={`tel:${member.phone.replace(/\s/g, "")}`}
            className="text-gray-500 hover:text-blue-600 transition-colors"
            aria-label={`Call ${member.name}`}
          >
            <Phone className="h-5 w-5" />
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600 transition-colors"
            aria-label={`${member.name}'s LinkedIn profile`}
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
});

TeamMemberCard.displayName = 'TeamMemberCard';

const TeamSection = () => {
  const t = useTranslations("home.team")

  // Using useCallback for event handlers if needed in the future
  const handleViewAllTeam = useCallback(() => {
    // Future implementation for viewing all team members
    console.log("View all team clicked");
  }, []);

  return (
    <ErrorBoundary>
      <section className="w-full py-12 md:py-24 lg:py-32" aria-labelledby="team-section-title">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 id="team-section-title" className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("title")}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("subtitle")}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <TeamMemberCard 
                key={member.id} 
                member={member} 
                positionLabel={t(`position.${member.position}`)} 
              />
            ))}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  )
}

export default memo(TeamSection)
