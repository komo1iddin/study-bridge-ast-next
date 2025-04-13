import Link from "next/link"
import Image from "next/image"
import {
  GraduationCap,
  Phone,
  ChevronRight,
  Building2,
  BookOpen,
  Globe,
  Briefcase,
  Users,
  DollarSign,
  Award,
  MapPin,
  TrendingUp,
  CheckCircle2,
  Star,
  BarChart3,
  Lightbulb,
  Heart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Sample statistics data
const statistics = [
  { value: "3000+", label: "Xalqaro universitetlar", icon: Building2 },
  { value: "500,000+", label: "Xalqaro talabalar", icon: Users },
  { value: "70+", label: "Davlatlardan talabalar", icon: Globe },
  { value: "Top 5", label: "Ta'lim tizimi reytingi", icon: Award },
]

// Sample university rankings
const topUniversities = [
  { name: "Tsinghua University", rank: "#14", city: "Beijing" },
  { name: "Peking University", rank: "#16", city: "Beijing" },
  { name: "Fudan University", rank: "#31", city: "Shanghai" },
  { name: "Shanghai Jiao Tong University", rank: "#59", city: "Shanghai" },
  { name: "Zhejiang University", rank: "#45", city: "Hangzhou" },
]

// Sample testimonials
const testimonials = [
  {
    name: "Aziza Karimova",
    role: "Biznes boshqaruvi, 3-kurs",
    university: "Shanghai Jiao Tong University",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Xitoyda o'qish menga nafaqat sifatli ta'lim, balki butunlay yangi dunyoqarash ham berdi. Bu yerda men ko'plab xalqaro do'stlar orttirdim va kelajak karyeram uchun muhim aloqalar o'rnatdim.",
  },
  {
    name: "Bobur Aliyev",
    role: "Kompyuter fanlari, 4-kurs",
    university: "Tsinghua University",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Xitoy IT sohasida juda rivojlangan. Men dunyoning eng yaxshi universitetlaridan birida o'qiyapman va zamonaviy texnologiyalar bilan ishlash imkoniyatiga egaman. Bu tajriba mening karyeramni butunlay o'zgartirdi.",
  },
  {
    name: "Malika Rahimova",
    role: "Tibbiyot, 3-kurs",
    university: "Peking University",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Xitoyda tibbiyot sohasida o'qish - bu an'anaviy va zamonaviy tibbiyotni birlashtirish imkoniyati. Men bu yerda olgan bilimlarim bilan O'zbekistonga qaytib, o'z yurtimga xizmat qilishni rejalashtirmoqdaman.",
  },
]

// Sample career fields
const careerFields = [
  {
    title: "Biznes va moliya",
    description: "Xalqaro kompaniyalarda boshqaruv, marketing va moliya sohasida karyera",
    icon: Briefcase,
    opportunities: ["Xitoy-O'zbekiston savdo aloqalari", "Xalqaro marketing", "Investitsiya boshqaruvi"],
  },
  {
    title: "Texnologiya va innovatsiya",
    description: "IT, sun'iy intellekt va raqamli texnologiyalar sohasida karyera",
    icon: Lightbulb,
    opportunities: ["Dasturiy ta'minot ishlab chiqish", "Ma'lumotlar ilmi", "Elektron tijorat"],
  },
  {
    title: "Ta'lim va tadqiqot",
    description: "Akademik va ilmiy-tadqiqot sohasida karyera",
    icon: BookOpen,
    opportunities: ["Universitetlarda o'qitish", "Ilmiy tadqiqotlar", "Ta'lim loyihalari"],
  },
  {
    title: "Tibbiyot va sog'liqni saqlash",
    description: "Zamonaviy va an'anaviy tibbiyot sohasida karyera",
    icon: Heart,
    opportunities: ["Klinik tibbiyot", "An'anaviy xitoy tibbiyoti", "Tibbiy tadqiqotlar"],
  },
]

// Sample cost comparison data
const costComparison = [
  { country: "AQSh", tuition: "$25,000-$50,000", living: "$15,000-$25,000", total: "$40,000-$75,000" },
  { country: "Buyuk Britaniya", tuition: "$20,000-$35,000", living: "$12,000-$20,000", total: "$32,000-$55,000" },
  { country: "Avstraliya", tuition: "$20,000-$40,000", living: "$10,000-$20,000", total: "$30,000-$60,000" },
  { country: "Kanada", tuition: "$15,000-$35,000", living: "$8,000-$15,000", total: "$23,000-$50,000" },
  { country: "Xitoy", tuition: "$3,000-$10,000", living: "$3,000-$6,000", total: "$6,000-$16,000" },
]

// Sample cultural experiences
const culturalExperiences = [
  {
    title: "Tarixiy va madaniy meros",
    description: "5000 yillik tarix, Buyuk Xitoy devori, Terrakota armiyasi va ko'plab tarixiy joylar",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Zamonaviy megapolislar",
    description: "Shanghai, Beijing, Shenzhen kabi zamonaviy va rivojlangan shaharlar",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Xitoy tili va madaniyati",
    description: "Dunyoda eng ko'p so'zlashuvchi tilni o'rganish va boy madaniyatni o'zlashtirish",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Milliy oshxona",
    description: "Dunyoga mashhur xitoy taomlarini tatib ko'rish va tayyorlashni o'rganish",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function WhyChinaPage() {
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
              <Link
                href="/programs"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Programs
              </Link>
              <Link
                href="/#services"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Services
              </Link>
              <Link href="/why-china" className="text-sm font-medium transition-colors hover:text-primary">
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
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Nima uchun Xitoyda o'qish kerak?
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Xitoy nafaqat sifatli va arzon ta'lim, balki boy madaniyat, zamonaviy texnologiyalar va keng karyera
                  imkoniyatlarini ham taqdim etadi.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Dasturlarni ko'rish
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Batafsil ma'lumot so'rash
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="Chinese university campus with students"
                  className="w-full rounded-xl object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {statistics.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card
                    key={index}
                    className="border-2 border-blue-100 transition-all duration-200 hover:border-blue-600"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Main Benefits */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Xitoyda o'qishning asosiy afzalliklari
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Xitoyda o'qish nafaqat sifatli ta'lim, balki kelajak uchun keng imkoniyatlar ham demakdir.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      <h3 className="text-xl font-bold">Yuqori sifatli ta'lim</h3>
                    </div>
                    <p className="text-white/80">
                      Xitoy universitetlari jahon reytinglarida yuqori o'rinlarni egallab, zamonaviy o'quv dasturlari va
                      yuqori malakali o'qituvchilar bilan ta'minlangan.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      <h3 className="text-xl font-bold">Arzon narxlar</h3>
                    </div>
                    <p className="text-white/80">
                      G'arb mamlakatlariga qaraganda ancha arzon o'qish va yashash xarajatlari, hamda ko'plab stipendiya
                      imkoniyatlari mavjud.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      <h3 className="text-xl font-bold">Xalqaro tan olingan diplom</h3>
                    </div>
                    <p className="text-white/80">
                      Xitoy universitetlari diplomlari butun dunyo bo'ylab tan olinadi va xalqaro mehnat bozorida yuqori
                      baholanadi.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      <h3 className="text-xl font-bold">Karyera imkoniyatlari</h3>
                    </div>
                    <p className="text-white/80">
                      Xitoy iqtisodiyoti dunyoda eng tez rivojlanayotgan iqtisodiyotlardan biri bo'lib, bitiruvchilar
                      uchun keng karyera imkoniyatlarini taqdim etadi.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      <h3 className="text-xl font-bold">Xitoy tilini o'rganish</h3>
                    </div>
                    <p className="text-white/80">
                      Dunyoda eng ko'p so'zlashuvchi tillardan birini o'rganish imkoniyati, bu kelajakda katta ustunlik
                      beradi.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <h3 className="text-xl font-bold">Madaniy tajriba</h3>
                    </div>
                    <p className="text-white/80">
                      5000 yillik tarixga ega bo'lgan boy madaniyatni o'rganish va xalqaro do'stlar orttirish
                      imkoniyati.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Top Universities */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Xitoyning eng yaxshi universitetlari
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Xitoy universitetlari jahon reytinglarida yuqori o'rinlarni egallaydi va sifatli ta'lim beradi.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12">
              <div className="relative overflow-hidden rounded-xl border bg-background p-2">
                <div className="grid grid-cols-3 gap-2 text-center text-sm font-medium">
                  <div className="bg-blue-600 text-white rounded-lg py-3">Universitet</div>
                  <div className="bg-blue-600 text-white rounded-lg py-3">Jahon reytingi</div>
                  <div className="bg-blue-600 text-white rounded-lg py-3">Joylashuv</div>
                </div>
                {topUniversities.map((uni, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-2 text-center text-sm mt-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <div className="py-3 font-medium">{uni.name}</div>
                    <div className="py-3">{uni.rank}</div>
                    <div className="py-3 flex items-center justify-center gap-1">
                      <MapPin className="h-3 w-3 text-blue-600" />
                      {uni.city}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Barcha universitetlarni ko'rish
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ta'lim narxlari taqqoslanishi</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Xitoyda o'qish boshqa mashhur ta'lim yo'nalishlariga qaraganda ancha arzon
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <div className="relative overflow-hidden rounded-xl border bg-background p-2">
                <div className="grid grid-cols-4 gap-2 text-center text-sm font-medium">
                  <div className="bg-blue-600 text-white rounded-lg py-3">Davlat</div>
                  <div className="bg-blue-600 text-white rounded-lg py-3">O'quv to'lovi (yillik)</div>
                  <div className="bg-blue-600 text-white rounded-lg py-3">Yashash xarajatlari (yillik)</div>
                  <div className="bg-blue-600 text-white rounded-lg py-3">Jami (yillik)</div>
                </div>
                {costComparison.map((country, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-4 gap-2 text-center text-sm mt-2 hover:bg-muted rounded-lg transition-colors ${
                      country.country === "Xitoy" ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="py-3 font-medium">{country.country}</div>
                    <div className="py-3">{country.tuition}</div>
                    <div className="py-3">{country.living}</div>
                    <div className="py-3 font-medium">{country.total}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center text-sm text-muted-foreground">
                * Narxlar taxminiy bo'lib, universitet va dasturga qarab farq qilishi mumkin
              </div>
            </div>
          </div>
        </section>

        {/* Career Opportunities */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Karyera imkoniyatlari</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Xitoyda o'qish bitiruvchilarga keng ko'lamli karyera imkoniyatlarini ochib beradi
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2">
              {careerFields.map((field, index) => {
                const Icon = field.icon
                return (
                  <Card key={index} className="transition-all duration-200 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                            <Icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-bold">{field.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{field.description}</p>
                        <ul className="space-y-2">
                          {field.opportunities.map((opportunity, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                              <span>{opportunity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <div className="flex justify-center">
              <Card className="max-w-3xl bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Xitoy-O'zbekiston aloqalari</h3>
                      <p className="text-muted-foreground">
                        Xitoy O'zbekistonning eng yirik savdo hamkorlaridan biri hisoblanadi. Ikki davlat o'rtasidagi
                        savdo-iqtisodiy aloqalar tobora rivojlanib bormoqda, bu esa Xitoyda ta'lim olgan mutaxassislarga
                        bo'lgan talabni oshirmoqda.
                      </p>
                      <div className="pt-2">
                        <Badge className="bg-blue-600">Katta imkoniyat</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Cultural Experience */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Madaniy tajriba</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Xitoyda o'qish - bu nafaqat ta'lim, balki boy madaniyat va an'analarni o'rganish imkoniyati ham
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2">
              {culturalExperiences.map((experience, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <div className="relative">
                    <Image
                      src={experience.image || "/placeholder.svg"}
                      alt={experience.title}
                      width={400}
                      height={300}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{experience.title}</h3>
                      <p className="text-muted-foreground">{experience.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Talabalarimiz fikrlari</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Xitoyda o'qiyotgan O'zbekistonlik talabalar tajribasi
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="transform transition-all duration-200 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        width={100}
                        height={100}
                        alt={`${testimonial.name} portrait`}
                        className="rounded-full object-cover"
                      />
                      <div className="space-y-2 text-center">
                        <h3 className="text-xl font-bold">{testimonial.name}</h3>
                        <p className="text-sm text-blue-600">{testimonial.role}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.university}</p>
                        <div className="flex justify-center py-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">"{testimonial.quote}"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Study Options */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">O'qish imkoniyatlari</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Xitoyda turli xil o'qish imkoniyatlari mavjud
                </p>
              </div>
            </div>
            <div className="mx-auto py-12">
              <Tabs defaultValue="bachelor" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="bachelor">Bakalavr</TabsTrigger>
                  <TabsTrigger value="master">Magistratura</TabsTrigger>
                  <TabsTrigger value="phd">Doktorantura</TabsTrigger>
                  <TabsTrigger value="language">Til kurslari</TabsTrigger>
                </TabsList>
                <TabsContent value="bachelor" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="text-2xl font-bold">Bakalavr dasturlari</h3>
                          <p className="mt-2 text-muted-foreground">
                            Bakalavr dasturlari odatda 4-5 yil davom etadi va talabalar o'z sohalari bo'yicha chuqur
                            bilim va ko'nikmalarni egallaydilar. Ko'plab dasturlar ingliz tilida o'qitiladi.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              4-5 yillik o'qish
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              Ingliz yoki xitoy tilida o'qitish
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              Stipendiya imkoniyatlari
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              Amaliy tajriba
                            </li>
                          </ul>
                        </div>
                        <div className="flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=300&width=400"
                            width={400}
                            height={300}
                            alt="Bachelor students in a classroom"
                            className="rounded-lg object-cover"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="master" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="text-2xl font-bold">Magistratura dasturlari</h3>
                          <p className="mt-2 text-muted-foreground">
                            Magistratura dasturlari odatda 2-3 yil davom etadi va talabalar o'z sohalari bo'yicha
                            ixtisoslashgan bilim va tadqiqot ko'nikmalarini egallaydilar.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              2-3 yillik o'qish
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              Tadqiqot imkoniyatlari
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              Yuqori stipendiya imkoniyatlari
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              Karyera rivojlantirish
                            </li>
                          </ul>
                        </div>
                        <div className="flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=300&width=400"
                            width={400}
                            height={300}
                            alt="Master students in a laboratory"
                            className="rounded-lg object-cover"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="phd" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="text-2xl font-bold">Doktorantura dasturlari</h3>
                          <p className="mt-2 text-muted-foreground">
                            Doktorantura dasturlari odatda 3-5 yil davom etadi va talabalar o'z sohalari bo'yicha chuqur
                            tadqiqot olib boradilar va ilmiy daraja olishga tayyorlanadilar.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              3-5 yillik tadqiqot
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              To'liq stipendiya imkoniyatlari
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              Xalqaro ilmiy hamkorlik
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              Akademik karyera
                            </li>
                          </ul>
                        </div>
                        <div className="flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=300&width=400"
                            width={400}
                            height={300}
                            alt="PhD students conducting research"
                            className="rounded-lg object-cover"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="language" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="text-2xl font-bold">Xitoy tili kurslari</h3>
                          <p className="mt-2 text-muted-foreground">
                            Xitoy tili kurslarida talabalar xitoy tilini o'rganadilar va madaniyatni o'zlashtiradilar.
                            Bu kurslar 6 oydan 2 yilgacha davom etishi mumkin.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />6 oydan 2 yilgacha
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              Barcha darajalar uchun kurslar
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              Madaniy tadbirlar
                            </li>
                            <li className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              HSK imtihoniga tayyorgarlik
                            </li>
                          </ul>
                        </div>
                        <div className="flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=300&width=400"
                            width={400}
                            height={300}
                            alt="Students learning Chinese language"
                            className="rounded-lg object-cover"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Facts and Figures */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Xitoy haqida faktlar</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Xitoy haqida qiziqarli ma'lumotlar
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600">2-o'rin</div>
                  <p className="text-sm text-muted-foreground">Dunyo iqtisodiyotida</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600">2,900+</div>
                  <p className="text-sm text-muted-foreground">Oliy ta'lim muassasalari</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Globe className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600">1.4 mlrd</div>
                  <p className="text-sm text-muted-foreground">Aholi soni</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600">60,000+</div>
                  <p className="text-sm text-muted-foreground">Xalqaro stipendiyalar</p>
                </CardContent>
              </Card>
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
                    Dasturlarni ko'rish
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
