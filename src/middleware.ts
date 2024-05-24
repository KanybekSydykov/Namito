const { cookies } = require("next/headers");
const { NextResponse } = require("next/server");
const { i18n } = require("./i18n-config");
const { match: matchLocale } = require("@formatjs/intl-localematcher");
const Negotiator = require("negotiator");

// Regex to match public files
const PUBLIC_FILE = /\.(.*)$/;

function getLocale(request) {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

function isAuthenticated(request) {
  const cookiesObj = cookies(request);
  const sessionCookie = cookiesObj.get("session");

  return !!sessionCookie;
}

function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Check if it's a public file
  if (PUBLIC_FILE.test(request.nextUrl.pathname)) {
    return;
  }

  // Check if the user is authenticated
  const isAuth = isAuthenticated(request);

  // If user is not authenticated, redirect to login or handle as needed
  if (!isAuth) {
    // Example: Redirect to login page if trying to access cart or favorites
    if (
      pathname.startsWith("/cart") ||
      pathname.startsWith("/favorites") ||
      pathname.startsWith("/checkout")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

module.exports = {
  middleware,
  config: {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: [
      '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
    ],
  },
};
