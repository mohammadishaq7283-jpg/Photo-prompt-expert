import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'ur', 'hi', 'ar', 'es', 'fr'],
  defaultLocale: 'en'
});
 
export const config = {
  matcher: ['/', '/(en|ur|hi|ar|es|fr)/:path*']
};
