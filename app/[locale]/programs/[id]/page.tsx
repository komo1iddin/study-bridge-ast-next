import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  GraduationCap,
  Clock,
  Globe,
  Calendar,
  CheckCircle2,
  Phone,
  MapPin,
  Share2,
  BookOpen,
  Users,
  Award,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample program data
const programs = {
  "business-management": {
    id: "business-management",
    title: "Biznes boshqaruvi",
    university: "Shanghai Jiao Tong University",
    universityLogo: "/placeholder.svg?height=100&width=100",
    universityRanking: "#59 QS World University Rankings",
    universityLocation: "Shanghai, Xitoy",
    level: "Bakalavr",
    duration: "4 yil",
    language: "Ingliz",
    startDates: "Sentabr, Fevral",
    category: "business",
    scholarship: true,
    scholarshipAmount: "25-100% o'quv to'lovi",
    tuitionFee: "$4,000 - $6,000 / yil",
    livingCost: "$3,000 - $5,000 / yil",
    applicationFee: "$100",
    applicationDeadline: "15-May (Kuzgi semestr), 15-Noyabr (Bahorgi semestr)",
    image: "/placeholder.svg?height=600&width=800",
    description:
      "Biznes boshqaruvi dasturi talabalarga zamonaviy biznes muhitida muvaffaqiyatli faoliyat yuritish uchun zarur bo'lgan bilim va ko'nikmalarni beradi. Dastur marketing, moliya, buxgalteriya hisobi, inson resurslari boshqaruvi va strategik rejalashtirish kabi sohalarda chuqur bilimlarni o'z ichiga oladi.",
    highlights: [
      "Xalqaro tan olingan diplom",
      "Amaliy tajriba va internship imkoniyatlari",
      "Xitoy va xalqaro kompaniyalar bilan hamkorlik",
      "Zamonaviy o'quv dasturi va metodologiya",
      "Karyera rivojlantirish xizmatlari",
    ],
    curriculum: [
      {
        year: "1-yil",
        courses: [
          "Biznesga kirish",
          "Mikroiqtisodiyot",
          "Makroiqtisodiyot",
          "Biznes matematikasi",
          "Biznes kommunikatsiyasi",
          "Xitoy tili (boshlang'ich)",
        ],
      },
      {
        year: "2-yil",
        courses: [
          "Buxgalteriya hisobi asoslari",
          "Marketing asoslari",
          "Biznes huquqi",
          "Statistika",
          "Moliya asoslari",
          "Xitoy tili (o'rta)",
        ],
      },
      {
        year: "3-yil",
        courses: [
          "Inson resurslari boshqaruvi",
          "Operatsiyalar boshqaruvi",
          "Biznes strategiyasi",
          "Xalqaro biznes",
          "Moliyaviy boshqaruv",
          "Xitoy tili (yuqori)",
        ],
      },
      {
        year: "4-yil",
        courses: [
          "Strategik boshqaruv",
          "Tadqiqot metodlari",
          "Biznes etikasi",
          "Innovatsiya va tadbirkorlik",
          "Bitirish loyihasi",
          "Internship",
        ],
      },
    ],
    admissionRequirements: [
      "O'rta ta'lim haqida hujjat (attestat)",
      "IELTS 6.0 yoki TOEFL iBT 80 (ingliz tili bilish darajasi)",
      "Motivatsion xat",
      "Tavsiyanomalar (kamida 2 ta)",
      "Pasport nusxasi",
    ],
    applicationProcess: [
      "Online ariza to'ldirish",
      "Hujjatlarni topshirish",
      "Ariza ko'rib chiqilishi (4-6 hafta)",
      "Suhbat (kerak bo'lsa)",
      "Qabul haqida xabarnoma",
      "Viza uchun ariza topshirish",
      "Xitoyga jo'nash",
    ],
    careerOpportunities: [
      "Biznes tahlilchi",
      "Marketing menejeri",
      "Moliyaviy menejer",
      "Loyiha menejeri",
      "Tadbirkor",
      "Konsultant",
      "Xalqaro kompaniyalarda boshqaruv lavozimi",
    ],
    relatedPrograms: [
      {
        id: "finance",
        title: "Moliya",
        university: "Fudan University",
        level: "Magistr",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "international-business",
        title: "Xalqaro biznes",
        university: "Beijing Normal University",
        level: "Bakalavr",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "marketing",
        title: "Marketing",
        university: "Nanjing University",
        level: "Bakalavr",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  "computer-science": {
    id: "computer-science",
    title: "Kompyuter fanlari",
    university: "Tsinghua University",
    universityLogo: "/placeholder.svg?height=100&width=100",
    universityRanking: "#14 QS World University Rankings",
    universityLocation: "Beijing, Xitoy",
    level: "Bakalavr",
    duration: "4 yil",
    language: "Ingliz",
    startDates: "Sentabr",
    category: "it",
    scholarship: true,
    scholarshipAmount: "50-100% o'quv to'lovi",
    tuitionFee: "$5,000 - $7,000 / yil",
    livingCost: "$3,500 - $5,500 / yil",
    applicationFee: "$150",
    applicationDeadline: "30-Aprel (Kuzgi semestr)",
    image: "/placeholder.svg?height=600&width=800",
    description:
      "Kompyuter fanlari dasturi talabalarga dasturlash, algoritmlar, ma'lumotlar tuzilmalari, sun'iy intellekt va kompyuter tizimlari bo'yicha chuqur bilimlarni beradi. Dastur nazariy bilimlar bilan bir qatorda amaliy ko'nikmalarni ham rivojlantirishga qaratilgan.",
    highlights: [
      "Dunyoning eng yaxshi texnologik universitetlaridan birida ta'lim",
      "Zamonaviy laboratoriyalar va jihozlar",
      "Yirik texnologik kompaniyalar bilan hamkorlik",
      "Tadqiqot loyihalarida ishtirok etish imkoniyati",
      "Xalqaro tan olingan diplom",
    ],
    curriculum: [
      {
        year: "1-yil",
        courses: [
          "Dasturlash asoslari",
          "Diskret matematika",
          "Kompyuter tizimlari arxitekturasi",
          "Calculus",
          "Fizika",
          "Xitoy tili (boshlang'ich)",
        ],
      },
      {
        year: "2-yil",
        courses: [
          "Ma'lumotlar tuzilmalari va algoritmlar",
          "Dasturlash tillari",
          "Operatsion tizimlar",
          "Ehtimollik nazariyasi va statistika",
          "Raqamli mantiq",
          "Xitoy tili (o'rta)",
        ],
      },
      {
        year: "3-yil",
        courses: [
          "Ma'lumotlar bazasi tizimlari",
          "Kompyuter tarmoqlari",
          "Dasturiy ta'minot muhandisligi",
          "Sun'iy intellektga kirish",
          "Kompyuter grafikasi",
          "Xitoy tili (yuqori)",
        ],
      },
      {
        year: "4-yil",
        courses: [
          "Mashina o'rganishi",
          "Kiberxavfsizlik",
          "Parallel hisoblash",
          "Mobil ilovalar ishlab chiqish",
          "Bitirish loyihasi",
          "Internship",
        ],
      },
    ],
    admissionRequirements: [
      "O'rta ta'lim haqida hujjat (attestat)",
      "IELTS 6.5 yoki TOEFL iBT 90 (ingliz tili bilish darajasi)",
      "Matematika va fizika fanlaridan yuqori ball",
      "Motivatsion xat",
      "Tavsiyanomalar (kamida 2 ta)",
      "Pasport nusxasi",
    ],
    applicationProcess: [
      "Online ariza to'ldirish",
      "Hujjatlarni topshirish",
      "Ariza ko'rib chiqilishi (4-6 hafta)",
      "Kirish imtihoni (matematika va dasturlash)",
      "Suhbat (kerak bo'lsa)",
      "Qabul haqida xabarnoma",
      "Viza uchun ariza topshirish",
      "Xitoyga jo'nash",
    ],
    careerOpportunities: [
      "Dasturiy ta'minot muhandisi",
      "Tizim administratori",
      "Ma'lumotlar bazasi administratori",
      "Veb-dasturchi",
      "Mobil ilovalar ishlab chiquvchisi",
      "Sun'iy intellekt mutaxassisi",
      "Kiberxavfsizlik mutaxassisi",
      "Tadqiqotchi",
    ],
    relatedPrograms: [
      {
        id: "artificial-intelligence",
        title: "Sun'iy intellekt",
        university: "Nanjing University",
        level: "Magistr",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "data-science",
        title: "Ma'lumotlar ilmi",
        university: "Zhejiang University",
        level: "Bakalavr",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "cybersecurity",
        title: "Kiberxavfsizlik",
        university: "Shanghai Jiao Tong University",
        level: "Bakalavr",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
}

export default async function ProgramDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const program = programs[params.id as keyof typeof programs] || programs["business-management"]

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
        {/* Breadcrumb */}
        <div className="container px-4 py-4 md:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/programs" className="hover:text-primary">
              Programs
            </Link>
            <span>/</span>
            <span className="text-foreground">{program.title}</span>
          </div>
        </div>

        {/* Program Header */}
        <section className="w-full py-8 md:py-12 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <Link
                  href="/programs"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Barcha dasturlarga qaytish
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{program.title}</h1>
                <div className="flex items-center gap-2">
                  <Image
                    src={program.universityLogo || "/placeholder.svg"}
                    alt={program.university}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{program.university}</p>
                    <p className="text-sm text-muted-foreground">{program.universityRanking}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-blue-600">{program.level}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {program.duration}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {program.language} tilida
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {program.startDates}
                  </Badge>
                  {program.scholarship && (
                    <Badge variant="outline" className="flex items-center gap-1 border-green-500 text-green-600">
                      <Award className="h-3 w-3" />
                      Stipendiya mavjud
                    </Badge>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Ariza topshirish
                  </Button>
                  <Button size="lg" variant="outline">
                    Batafsil ma'lumot so'rash
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
                <Image
                  src={program.image || "/placeholder.svg"}
                  width={800}
                  height={600}
                  alt={program.title}
                  className="w-full rounded-xl object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Program Details */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Overview */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Dastur haqida</h2>
                  <p className="text-muted-foreground">{program.description}</p>
                  <div className="grid gap-4 sm:grid-cols-2 pt-4">
                    {program.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        <p>{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Curriculum */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">O'quv dasturi</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {program.curriculum.map((year, index) => (
                      <AccordionItem key={index} value={`year-${index}`}>
                        <AccordionTrigger className="text-lg font-medium">{year.year}</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 pl-6">
                            {year.courses.map((course, courseIndex) => (
                              <li key={courseIndex} className="flex items-start gap-2">
                                <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                                <span>{course}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Admission Requirements */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Qabul talablari</h2>
                  <ul className="space-y-2">
                    {program.admissionRequirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Application Process */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Ariza topshirish jarayoni</h2>
                  <div className="relative pl-8 space-y-6 before:absolute before:left-4 before:top-0 before:h-full before:w-[2px] before:bg-muted">
                    {program.applicationProcess.map((step, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-8 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                          {index + 1}
                        </div>
                        <p className="font-medium">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Opportunities */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Karyera imkoniyatlari</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {program.careerOpportunities.map((career, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                        <p>{career}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">Asosiy ma'lumotlar</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">O'quv to'lovi:</span>
                        <span className="font-medium">{program.tuitionFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Yashash xarajatlari:</span>
                        <span className="font-medium">{program.livingCost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ariza to'lovi:</span>
                        <span className="font-medium">{program.applicationFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ariza muddati:</span>
                        <span className="font-medium">{program.applicationDeadline}</span>
                      </div>
                      {program.scholarship && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stipendiya:</span>
                          <span className="font-medium text-green-600">{program.scholarshipAmount}</span>
                        </div>
                      )}
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Ariza topshirish</Button>
                  </CardContent>
                </Card>

                {/* University Info */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={program.universityLogo || "/placeholder.svg"}
                        alt={program.university}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-bold">{program.university}</h3>
                        <p className="text-sm text-muted-foreground">{program.universityRanking}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                      <p>{program.universityLocation}</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Universitet haqida batafsil
                    </Button>
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">Savollaringiz bormi?</h3>
                    <p className="text-muted-foreground">Bizning mutaxassislarimiz sizga yordam berishga tayyor</p>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Qo'ng'iroq qilish
                      </Button>
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m22 2-7 20-4-9-9-4Z" />
                          <path d="M22 2 11 13" />
                        </svg>
                        Telegram
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Share */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">Ulashing</h3>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Programs */}
        <section className="w-full py-12 md:py-16 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">O'xshash dasturlar</h2>
                <p className="text-muted-foreground">Sizni qiziqtirishi mumkin bo'lgan boshqa dasturlar</p>
              </div>
            </div>
            <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
              {program.relatedPrograms.map((relatedProgram) => (
                <Link href={`/programs/${relatedProgram.id}`} key={relatedProgram.id} className="group">
                  <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                    <div className="relative">
                      <Image
                        src={relatedProgram.image || "/placeholder.svg"}
                        alt={relatedProgram.title}
                        width={400}
                        height={200}
                        className="aspect-[2/1] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                          {relatedProgram.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{relatedProgram.university}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="outline">{relatedProgram.level}</Badge>
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
