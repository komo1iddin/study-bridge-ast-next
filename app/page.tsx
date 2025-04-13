import Link from "next/link"
import {
  GraduationCap,
  Phone,
} from "lucide-react"

import { Button } from "@/components/ui/button"

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
        {/* Main content will go here */}
      </main>
    </div>
  )
}
