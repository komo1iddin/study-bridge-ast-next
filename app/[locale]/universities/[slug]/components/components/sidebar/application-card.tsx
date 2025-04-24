"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import type { University } from "@/components/universities/data"

interface ApplicationCardProps {
  university: University
  t: any
  lang: string
}

export function ApplicationCard({ university, t, lang }: ApplicationCardProps) {
  return (
    <Card className="border-none shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <h3 className="font-bold text-lg">Hozir ariza topshiring</h3>
        <p className="text-white/80 text-sm mt-1">
          {university.name} universitetiga arizangizni boshlang
        </p>
      </div>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Ariza topshirish muddati</span>
            </div>
            <span className="text-sm font-bold">June 30, 2023</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Ko'rib chiqish muddati</span>
            </div>
            <span className="text-sm font-bold">4-6 weeks</span>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-sm text-slate-600">
              Ariza to'lovi: <span className="font-bold text-slate-800">$50 - $100</span>
            </p>
          </div>
          
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Onlayn ariza topshirish
          </Button>
          
          <p className="text-xs text-slate-500 text-center">
            Ariza topshirish jarayoni haqida qo'shimcha ma'lumot olish uchun universitetning rasmiy veb-saytiga tashrif buyuring.
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 