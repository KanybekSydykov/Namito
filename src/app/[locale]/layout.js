import { Providers } from "./Theme";
import "@/app/[locale]/globals.css";
import Header from "@/components/header/Header";
import FixedFooter from "@/components/footer/FixedFooter";
import { i18n, Locale } from "@/i18n-config";
import Footer from "@/components/footer/Footer";
import { ENDPOINTS } from "@/API/endpoints";
import { CounterProvider } from "@/lib/auth-content";
import { getSession } from "@/lib/lib";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import GlobalError from "./global-error";

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}


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


export default async function LocaleLayout({ children, params }) {
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
        <ErrorBoundary fallback={<GlobalError />}>

            <html lang={params.locale}>
                <body>


                    <Providers>
                        <CounterProvider>

                          <header>
                             <Header data={headerData} params={params} isAuth={isAuth ? true : false} token={isAuth ? isAuth.access_token : null} />
                            </header> 
                            <div>
                                {children}
                            </div>
                            <footer>
                            <FixedFooter params={params} token={isAuth ? isAuth.access_token : null} />
                            <Footer data={footerData} params={params} />
                            </footer>
                        </CounterProvider>

                    </Providers>


                </body>


            </html>

        </ErrorBoundary>
    )



}