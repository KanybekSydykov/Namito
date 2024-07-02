// middleware.js

import { NextResponse } from "next/server";
import { i18n } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getSession, updateSession } from "@/lib/lib"; // Adjust the path as per your project structure

const PUBLIC_FILE = /\.(.*)$/;

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales;

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );
  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}


export async function isAuthenticated(request) {
  const sessionCookie = await getSession(request);

  return sessionCookie;
}

export async function middleware(request) {
  const currentUser = await isAuthenticated(request);
  const pathname = request.nextUrl.pathname;
  const locale = pathname.match(/^\/(\w{2})\//)?.[1] || "";






  if (PUBLIC_FILE.test(request.nextUrl.pathname)) {
    return;
  }


  if (pathname.includes('logout')) {
    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.delete("session")
    return response;
  }

  if (currentUser) {
    await updateSession(request);
  }

  if (currentUser && pathname.startsWith(`/${locale}/login`)) {
    const first_visit = await getSession(request);
    if (first_visit.first_visit === 'true') {
      return NextResponse.redirect(new URL(`/${locale}/profile?page=settings`, request.url));
    }

    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  }

  if (!currentUser && pathname.includes(`/${locale}/profile`)) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
  if (!currentUser && pathname.startsWith(`/${locale}/favorites`)) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
  if (!currentUser && pathname.startsWith(`/${locale}/checkout`)) {
    console.log('locale in middleware ', locale);
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }


  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}
