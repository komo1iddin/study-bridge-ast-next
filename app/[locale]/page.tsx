import { getTranslations } from "next-intl/server"
import Navbar from "@/components/navbar"

export default async function Home(props: {
  params: { locale: string };
}) {
  // In Next.js 15, await the entire params object first
  const params = await props.params;
  const { locale } = params;
  
  const t = await getTranslations({ locale, namespace: "home" })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Main content will go here */}
      </main>
    </div>
  )
}
