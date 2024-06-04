import { Providers } from "./[locale]/Theme";
import "@/app/[locale]/globals.css";
import Header from "@/components/header/Header";
import FixedFooter from "@/components/footer/FixedFooter";
import { i18n, Locale } from "@/i18n-config";
import Footer from "@/components/footer/Footer";
import { ENDPOINTS } from "@/API/endpoints";
import { CounterProvider } from "@/lib/auth-content";
import { getSession } from "@/lib/lib";


export const dynamic = 'force-dynamic'

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params

  // fetch data
  const res = await fetch(`https://namito.tatadev.pro/api/layout-meta/`, {
    cache: 'no-store'
  })
  const [meta] = await res.json()

  // console.log(meta);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: meta.meta_title,
    description: meta.meta_description,
    openGraph: {
      description: meta.meta_description,
      title: meta.meta_title,
      images: [{ url: meta.meta_image }, ...previousImages],
    },
  }
}


export default async function RootLayout({ children }) {


  return (
    <html   >
      <body className={`body`}>
        <div>
          {
            children}
        </div>
      </body>


    </html>
  )



}