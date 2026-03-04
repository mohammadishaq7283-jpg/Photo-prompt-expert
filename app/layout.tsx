import "./[locale]/globals.css";

// Yeh sabse main layout hai jo 404 page ko bhi chalayega
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
