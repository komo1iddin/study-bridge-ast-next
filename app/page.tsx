import Link from "next/link"
import Image from "next/image"
import {
  ChevronRight,
  GraduationCap,
  FileText,
  Plane,
  Users,
  MessageCircle,
  Building2,
  Phone,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
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
              <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link
                href="#services"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Services
              </Link>
              <Link
                href="#programs"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Programs
              </Link>
              <Link
                href="#why-china"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Why China
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Testimonials
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                About Us
              </Link>
              <Link
                href="#contact"
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
                  Ishonchli yo'l Xitoy universitetlariga
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  O'zbekistondan Xitoyning nufuzli universitetlariga o'qishga kirish uchun professional yordam va
                  qo'llab-quvvatlash.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Hozir murojaat qiling
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Dasturlarni ko'ring
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

        {/* Why Study in China */}
        <section id="why-china" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nima uchun Xitoyda o'qish kerak?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Xitoyda o'qish nafaqat sifatli ta'lim, balki kelajak uchun keng imkoniyatlar ham demakdir.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4">
              <Card className="transform transition-all duration-200 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Nufuzli universitetlar</h3>
                  <p className="text-sm text-muted-foreground">
                    Dunyoning eng yaxshi 100 talik universitetlari ro'yxatiga kiruvchi ta'lim muassasalari
                  </p>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-200 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <GraduationCap className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Arzon narxlar</h3>
                  <p className="text-sm text-muted-foreground">
                    G'arb mamlakatlariga qaraganda ancha arzon o'qish va yashash xarajatlari
                  </p>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-200 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Madaniy tajriba</h3>
                  <p className="text-sm text-muted-foreground">
                    Qadimiy va boy madaniyatni o'rganish, xitoy tilini o'zlashtirish imkoniyati
                  </p>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-200 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Plane className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Kelajak imkoniyatlari</h3>
                  <p className="text-sm text-muted-foreground">
                    Xalqaro kompaniyalarda ish topish va global karyera qurish imkoniyatlari
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Bizning xizmatlarimiz</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Biz o'qishga kirish jarayonining har bir bosqichida professional yordam ko'rsatamiz.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Card className="transform transition-all duration-200 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Hujjatlarni tayyorlash</h3>
                  <p className="text-sm text-muted-foreground">
                    Barcha kerakli hujjatlarni to'g'ri tayyorlashda yordam
                  </p>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-200 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Universitetga kirish</h3>
                  <p className="text-sm text-muted-foreground">
                    Eng mos universitetni tanlash va arizalarni yuborishda yordam
                  </p>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-200 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Plane className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Viza olish</h3>
                  <p className="text-sm text-muted-foreground">Viza olish jarayonida to'liq qo'llab-quvvatlash</p>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-200 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <MessageCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Mentorlik</h3>
                  <p className="text-sm text-muted-foreground">Xitoyda o'qish va yashash bo'yicha maslahatlar</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Study Programs */}
        <section id="programs" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">O'quv dasturlari</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Xitoy universitetlarida eng mashhur va istiqbolli yo'nalishlar.
                </p>
              </div>
            </div>
            <div className="mx-auto py-12">
              <Tabs defaultValue="business" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="business">Biznes</TabsTrigger>
                  <TabsTrigger value="it">IT</TabsTrigger>
                  <TabsTrigger value="medicine">Tibbiyot</TabsTrigger>
                  <TabsTrigger value="engineering">Muhandislik</TabsTrigger>
                </TabsList>
                <TabsContent value="business" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="text-2xl font-bold">Biznes va boshqaruv</h3>
                          <p className="mt-2 text-muted-foreground">
                            Xalqaro biznes, moliya, marketing va boshqaruv sohasida sifatli ta'lim. Xitoyning iqtisodiy
                            o'sishi bilan bu soha bitiruvchilari uchun keng imkoniyatlar mavjud.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Xalqaro biznes
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Moliya va buxgalteriya hisobi
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Marketing
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Boshqaruv
                            </li>
                          </ul>
                        </div>
                        <div className="flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=300&width=400"
                            width={400}
                            height={300}
                            alt="Business students in a classroom"
                            className="rounded-lg object-cover"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="it" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="text-2xl font-bold">Axborot texnologiyalari</h3>
                          <p className="mt-2 text-muted-foreground">
                            Kompyuter fanlari, dasturlash, sun'iy intellekt va ma'lumotlar ilmi bo'yicha zamonaviy
                            ta'lim. Xitoy IT sohasida jahon yetakchilaridan biri hisoblanadi.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Kompyuter fanlari
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Dasturiy ta'minot muhandisligi
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Sun'iy intellekt
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Ma'lumotlar ilmi
                            </li>
                          </ul>
                        </div>
                        <div className="flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=300&width=400"
                            width={400}
                            height={300}
                            alt="IT students working on computers"
                            className="rounded-lg object-cover"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="medicine" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="text-2xl font-bold">Tibbiyot</h3>
                          <p className="mt-2 text-muted-foreground">
                            Zamonaviy tibbiyot va an'anaviy xitoy tibbiyoti bo'yicha chuqur bilimlar. Xitoy tibbiyot
                            sohasida qadimiy an'analarga va zamonaviy yutuqlarga ega.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Umumiy tibbiyot
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Stomatologiya
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Farmatsevtika
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              An'anaviy xitoy tibbiyoti
                            </li>
                          </ul>
                        </div>
                        <div className="flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=300&width=400"
                            width={400}
                            height={300}
                            alt="Medical students in laboratory"
                            className="rounded-lg object-cover"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="engineering" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="text-2xl font-bold">Muhandislik</h3>
                          <p className="mt-2 text-muted-foreground">
                            Fuqarolik, mexanika, elektr va kimyoviy muhandislik sohasida yuqori sifatli ta'lim. Xitoy
                            muhandislik sohasida jahon miqyosida yetakchi o'rinlarni egallaydi.
                          </p>
                          <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Fuqarolik muhandisligi
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Mexanika muhandisligi
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Elektr muhandisligi
                            </li>
                            <li className="flex items-center">
                              <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                              Kimyoviy muhandislik
                            </li>
                          </ul>
                        </div>
                        <div className="flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=300&width=400"
                            width={400}
                            height={300}
                            alt="Engineering students working on a project"
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

        {/* Testimonials */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Talabalarimiz fikrlari</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Bizning yordamimiz bilan Xitoyda o'qiyotgan talabalar tajribasi.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="transform transition-all duration-200 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      width={100}
                      height={100}
                      alt="Student portrait"
                      className="rounded-full object-cover"
                    />
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold">Aziza Karimova</h3>
                      <p className="text-sm text-blue-600">Shanghai Jiao Tong University</p>
                      <p className="text-sm text-muted-foreground">
                        "EduChina yordamida men Xitoyning eng yaxshi universitetlaridan biriga o'qishga kirdim. Ular
                        barcha jarayonlarda menga yordam berdilar va hozir men o'z orzuimni ro'yobga chiqaryapman."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-200 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      width={100}
                      height={100}
                      alt="Student portrait"
                      className="rounded-full object-cover"
                    />
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold">Bobur Aliyev</h3>
                      <p className="text-sm text-blue-600">Tsinghua University</p>
                      <p className="text-sm text-muted-foreground">
                        "Men IT sohasida o'qiyapman va Xitoy bu sohada juda rivojlangan. EduChina menga eng yaxshi
                        universitetni tanlashda va barcha hujjatlarni tayyorlashda yordam berdi."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-200 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      width={100}
                      height={100}
                      alt="Student portrait"
                      className="rounded-full object-cover"
                    />
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold">Malika Rahimova</h3>
                      <p className="text-sm text-blue-600">Peking University</p>
                      <p className="text-sm text-muted-foreground">
                        "Xitoyda o'qish - bu nafaqat sifatli ta'lim, balki yangi madaniyat va til o'rganish imkoniyati
                        ham. EduChina menga bu imkoniyatni berdi va men juda minnatdorman."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About the Agency */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Biz haqimizda</h2>
                <p className="text-muted-foreground md:text-xl">
                  EduChina - bu O'zbekistonlik talabalarni Xitoy universitetlariga o'qishga kirishda
                  qo'llab-quvvatlovchi professional ta'lim agentligi.
                </p>
                <p className="text-muted-foreground">
                  Bizning maqsadimiz - har bir talabaga o'z potentsialini ro'yobga chiqarish va xalqaro darajadagi
                  ta'lim olish imkoniyatini berish. Biz o'qishga kirish jarayonining har bir bosqichida yordam beramiz,
                  shu jumladan hujjatlarni tayyorlash, universitetni tanlash, viza olish va Xitoyga joylashishda.
                </p>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-3xl font-bold text-blue-600">500+</span>
                    <span className="text-sm text-muted-foreground">Muvaffaqiyatli talabalar</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-3xl font-bold text-blue-600">10+</span>
                    <span className="text-sm text-muted-foreground">Yillik tajriba</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-3xl font-bold text-blue-600">50+</span>
                    <span className="text-sm text-muted-foreground">Hamkor universitetlar</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-3xl font-bold text-blue-600">100%</span>
                    <span className="text-sm text-muted-foreground">Mijozlar qoniqishi</span>
                  </div>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="Our team helping students"
                  className="w-full rounded-xl object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Biz bilan bog'laning</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Xitoyda o'qish haqida savollaringiz bormi? Biz sizga yordam berishga tayyormiz.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="first-name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Ism
                        </label>
                        <input
                          id="first-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Ismingiz"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="last-name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Familiya
                        </label>
                        <input
                          id="last-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Familiyangiz"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="sizning@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Telefon
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="+998 90 123 45 67"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="program"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Qiziqtirgan yo'nalish
                      </label>
                      <select
                        id="program"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Yo'nalishni tanlang</option>
                        <option value="business">Biznes</option>
                        <option value="it">IT</option>
                        <option value="medicine">Tibbiyot</option>
                        <option value="engineering">Muhandislik</option>
                        <option value="other">Boshqa</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Xabar
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Xabaringizni yozing..."
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Yuborish
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-blue-600" />
                      <div>
                        <h3 className="text-xl font-bold">Telefon</h3>
                        <p className="text-muted-foreground">+998 90 123 45 67</p>
                        <p className="text-muted-foreground">+998 90 987 65 43</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-blue-600" />
                      <div>
                        <h3 className="text-xl font-bold">Email</h3>
                        <p className="text-muted-foreground">info@educhina.uz</p>
                        <p className="text-muted-foreground">support@educhina.uz</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Building2 className="h-6 w-6 text-blue-600" />
                      <div>
                        <h3 className="text-xl font-bold">Manzil</h3>
                        <p className="text-muted-foreground">Toshkent shahri, Amir Temur ko'chasi, 108-uy</p>
                        <p className="text-muted-foreground">Ish vaqti: Dushanba-Shanba, 9:00-18:00</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1">
                    <svg
                      className="mr-2 h-4 w-4"
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
                  <Button variant="outline" className="flex-1">
                    <svg
                      className="mr-2 h-4 w-4"
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
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Qo'ng'iroq
                  </Button>
                </div>
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
