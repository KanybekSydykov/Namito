import { Providers } from "./Theme";
import "@/app/[locale]/globals.css";
import Header from "@/components/header/Header";
import FixedFooter from "@/components/footer/FixedFooter";
import { i18n, Locale } from "@/i18n-config";
import Footer from "@/components/footer/Footer";
import { ENDPOINTS } from "@/API/endpoints";
import {  CounterProvider } from "@/lib/auth-content";
import { getSession } from "@/lib/lib";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
// export async function generateMetadata({ params, searchParams }, parent) {
//   // read route params

//   // fetch data
//   const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PAGES}`)
//   const meta = await res.json()

//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || []

//   return {
//     title: meta['about_page'].meta_title,
//     description: meta['about_page'].meta_description,
//     openGraph: {
//       description: meta['about_page'].meta_description,
//       title: meta['about_page'].meta_title,
//       images: [{ url: meta['about_page'].meta_image }, ...previousImages],
//     },
//   }
// }

export const dynamic = 'force-dynamic'


export default async function RootLayout({ children, params }) {
  const res = await fetch(`${ENDPOINTS.getLayoutData()}`, {
    cache: 'no-cache',
    headers: {
      'Accept-Language': `${params.locale}`,
    }
  })
  const data = await res.json()
  const headerData = { categories: data.categories, promoted: data.promoted_categories }
  const footerData = { phones: data.phones, emails: data.emails, socials: data.social_links, payment: data.payment_methods }

  const isAuth = await getSession();

  return (
    <html lang={params.locale}  >
      <body className={`body`}>

          <Providers>
            <CounterProvider>

            <Header data={headerData} params={params} isAuth= {isAuth ? true : false} token={ isAuth ? isAuth.access_token : null} />
            {children}
            <FixedFooter params={params} />
            <Footer data={footerData} />
            </CounterProvider>

          </Providers>


      </body>
    </html>
  )



}