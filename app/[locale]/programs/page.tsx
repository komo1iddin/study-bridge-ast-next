import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Search, GraduationCap, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Sample program data
const programs = [
  {
    id: "business-management",
    title: "Biznes boshqaruvi",
    university: "Shanghai Jiao Tong University",
    level: "Bakalavr",
    duration: "4 yil",
    language: "Ingliz",
    category: "business",
    scholarship: true,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: "computer-science",
    title: "Kompyuter fanlari",
    university: "Tsinghua University",
    level: "Bakalavr",
    duration: "4 yil",
    language: "Ingliz",
    category: "it",
    scholarship: true,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: "medicine",
    title: "Tibbiyot",
    university: "Peking University",
    level: "Bakalavr",
    duration: "5 yil",
    language: "Ingliz",
    category: "medicine",
    scholarship: false,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: "civil-engineering",
    title: "Fuqarolik muhandisligi",
    university: "Zhejiang University",
    level: "Bakalavr",
    duration: "4 yil",
    language: "Ingliz",
    category: "engineering",
    scholarship: true,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: "finance",
    title: "Moliya",
    university: "Fudan University",
    level: "Magistr",
    duration: "2 yil",
    language: "Ingliz",
    category: "business",
    scholarship: true,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: "artificial-intelligence",
    title: "Sun'iy intellekt",
    university: "Nanjing University",
    level: "Magistr",
    duration: "2 yil",
    language: "Ingliz",
    category: "it",
    scholarship: true,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: "traditional-chinese-medicine",
    title: "An'anaviy xitoy tibbiyoti",
    university: "Shanghai University of TCM",
    level: "Bakalavr",
    duration: "5 yil",
    language: "Xitoy",
    category: "medicine",
    scholarship: true,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: "mechanical-engineering",
    title: "Mexanika muhandisligi",
    university: "Harbin Institute of Technology",
    level: "Bakalavr",
    duration: "4 yil",
    language: "Ingliz",
    category: "engineering",
    scholarship: false,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
]

export default function ProgramsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <span className="inline-block font-bold">EduChina</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/programs" className="text-sm font-medium transition-colors hover:text-primary">
                Programs
              </Link>
              <Link
                href="/#services"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Services
              </Link>
              <Link
                href="/#why-china"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Why China
              </Link>
              <Link
                href="/#testimonials"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Testimonials
              </Link>
              <Link
                href="/#about"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                About Us
              </Link>
              <Link
                href="/#contact"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Button variant="outline" size="sm" className="hidden sm:flex mr-2">
                <Phone className="mr-2 h-4 w-4" />
                +998 90 123 45 67
              </Button>
              <Button>Apply Now</Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">O'quv dasturlari</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Xitoyning eng yaxshi universitetlarida o'qish uchun keng ko'lamli dasturlar
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="w-full py-8 border-b">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-4">
              <div className="space-y-2">
                <label
                  htmlFor="search"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Qidirish
                </label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="search" type="search" placeholder="Dastur nomi..." className="pl-8" />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Yo'nalish
                </label>
                <Select defaultValue="all">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Barcha yo'nalishlar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha yo'nalishlar</SelectItem>
                    <SelectItem value="business">Biznes</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="medicine">Tibbiyot</SelectItem>
                    <SelectItem value="engineering">Muhandislik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="level"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Daraja
                </label>
                <Select defaultValue="all">
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Barcha darajalar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha darajalar</SelectItem>
                    <SelectItem value="bachelor">Bakalavr</SelectItem>
                    <SelectItem value="master">Magistr</SelectItem>
                    <SelectItem value="phd">Doktorantura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="language"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  O'qitish tili
                </label>
                <Select defaultValue="all">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Barcha tillar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha tillar</SelectItem>
                    <SelectItem value="english">Ingliz</SelectItem>
                    <SelectItem value="chinese">Xitoy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Programs */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Tavsiya etilgan dasturlar</h2>
                <p className="text-muted-foreground">Eng mashhur va yuqori sifatli o'quv dasturlari</p>
              </div>
              <Link
                href="#all-programs"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
              >
                Barcha dasturlarni ko'rish
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
              {programs
                .filter((program) => program.featured)
                .map((program) => (
                  <Link href={`/programs/${program.id}`} key={program.id} className="group">
                    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                      <div className="relative">
                        <Image
                          src={program.image || "/placeholder.svg"}
                          alt={program.title}
                          width={400}
                          height={200}
                          className="aspect-[2/1] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {program.scholarship && (
                          <Badge className="absolute right-2 top-2 bg-blue-600">Stipendiya mavjud</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                            {program.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{program.university}</p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="outline">{program.level}</Badge>
                            <Badge variant="outline">{program.duration}</Badge>
                            <Badge variant="outline">{program.language} tilida</Badge>
                          </div>
                          <div className="pt-4">
                            <Button
                              variant="outline"
                              className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                            >
                              Batafsil ma'lumot
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* All Programs */}
        <section id="all-programs" className="w-full py-12 md:py-16 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Barcha dasturlar</h2>
                <p className="text-muted-foreground">
                  Xitoyning eng yaxshi universitetlarida mavjud bo'lgan barcha o'quv dasturlari
                </p>
              </div>
            </div>
            <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {programs.map((program) => (
                <Link href={`/programs/${program.id}`} key={program.id} className="group">
                  <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                    <div className="relative">
                      <Image
                        src={program.image || "/placeholder.svg"}
                        alt={program.title}
                        width={400}
                        height={200}
                        className="aspect-[2/1] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {program.scholarship && (
                        <Badge className="absolute right-2 top-2 bg-blue-600">Stipendiya mavjud</Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                          {program.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{program.university}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="outline">{program.level}</Badge>
                          <Badge variant="outline">{program.duration}</Badge>
                          <Badge variant="outline">{program.language} tilida</Badge>
                        </div>
                        <div className="pt-4">
                          <Button
                            variant="outline"
                            className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                          >
                            Batafsil ma'lumot
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Xitoyda o'qish uchun ariza topshiring
                </h2>
                <p className="md:text-xl">
                  Bizning mutaxassislarimiz sizga eng mos dasturni tanlashda va ariza topshirish jarayonida yordam
                  berishadi.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="secondary">
                    Hozir murojaat qiling
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-blue-600"
                  >
                    Biz bilan bog'laning
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="Students in a Chinese university"
                  className="w-full rounded-xl object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <span className="font-bold">EduChina</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} EduChina. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Maxfiylik siyosati
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Foydalanish shartlari
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
