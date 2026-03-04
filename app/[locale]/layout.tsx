import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, useMessages } from 'next-intl';

const inter = Inter({ subsets: ["latin"] });
const amiri = Amiri({ subsets: ["arabic"], weight: "400" });

export const metadata = { title: "PixelMystic AI", description: "AI Art & Chat" };

export default function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string }; }) {
  const messages = useMessages();
  const fontClass = locale === 'ar' || locale === 'ur' ? amiri.className : inter.className;
  const dir = locale === 'ar' || locale === 'ur' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={`${fontClass} overflow-hidden`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
