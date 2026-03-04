import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ur', 'hi', 'ar', 'es', 'fr'],
 
  // Used when no locale matches
  defaultLocale: 'en',

  // Force redirect to default locale always
  localePrefix: 'always'
});
 
export const config = {
  // Match only internationalized pathnames
  // Yeh regex zaroori hai taake api routes aur images block na hon
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
