'use client'

import React from 'react'
import { Star, Heart, Target } from 'lucide-react'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import SectionHeader from '../../../../../components/ui/section-header'

interface OurTeamProps {
  lang?: string
}

const OurTeam = ({ lang = 'en' }: OurTeamProps) => {
  const t = useTranslations('pages.home.components.ourTeam')

  // Team members data
  const teamMembers = [
    {
      name: "Avaz Nishonboyev",
      position: t('positions.position1'),
      image: "/images/team/Avaz_Nishonboyev.webp"
    },
    {
      name: "Maxmud Maxmudov",
      position: t('positions.position2'),
      image: "/images/team/Maxmud_Maxmudov.webp"
    },
    {
      name: "Javohir Zokirov",
      position: t('positions.position4'),
      image: "/images/team/Javohir_Zokirov.webp"
    },
    {
      name: "Shuxrat Usmonov",
      position: t('positions.position3'),
      image: "/images/team/Shuxrat_Usmonov.webp"
    }
  ]

  // Values data with icons
  const values = [
    {
      icon: Target,
      title: t('values.value1.title'),
      description: t('values.value1.description')
    },
    {
      icon: Heart,
      title: t('values.value2.title'),
      description: t('values.value2.description')
    },
    {
      icon: Star,
      title: t('values.value3.title'),
      description: t('values.value3.description')
    }
  ]

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
      {/* Section header */}
      <SectionHeader
        title={t('team.title')}
        subtitle={t('team.description')}
      />

      {/* Team members grid */}
      <div className="grid auto-rows-fr grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={member.name}
            className="group relative flex flex-col items-center text-center h-full"
            data-aos="fade-up"
            data-aos-delay={100 * index}
          >
            <div className="w-full flex flex-col flex-grow justify-between items-center p-6 rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative mb-6">
                <div className="rounded-full bg-gradient-to-br from-primary-400 to-primary-600 p-[4px] transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={224}
                    height={224}
                    className="rounded-full object-cover w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56"
                  />
                </div>
              </div>
              <div className="mt-auto flex flex-col items-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1 text-center whitespace-pre-line">
                  {member.name.split(' ').map((part, idx) => (
                    <span key={idx} className="block leading-tight">
                      {part}
                    </span>
                  ))}
                </h3>
                <p className="text-sm text-primary-600 font-medium text-center min-h-[42px] flex items-center justify-center">
                  {member.position}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Values section */}
      <div className="mt-12 mb-12">
        <SectionHeader
          title={t('values.mainTitle')}
          subtitle={t('values.description')}
        />
        
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                data-aos="fade-up"
                data-aos-delay={150 * index}
              >
                <div className="p-3 bg-primary-50 rounded-full mb-4 group-hover:bg-primary-500 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default OurTeam 