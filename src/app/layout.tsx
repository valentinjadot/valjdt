import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"], preload: true });

export const metadata: Metadata = {
  title: "Valentin Jadot",
  description: "Valentin Jadot - creative coder",
  metadataBase: new URL("https://valentinjadot.com"),
  creator: "Valentin Jadot",
  authors: [{ url: "https://valentinjadot.com", name: "Valentin Jadot" }],
  keywords: [
    "Valentin Jadot",
    "creative coder",
    "software developer",
    "personal website",
    "portfolio",
    "branding",
    "web development",
  ],
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  themeColor: "#000000",
  openGraph: {
    type: "website",
    url: "https://valentinjadot.com",
    title: "Valentin Jadot",
    description: "creative coder",
    images: [
      {
        url: "https://valentinjadot.com/og-image-with-text.jpg",
        width: 1190,
        height: 1000,
        alt: "Valentin Jadot",
      },
    ],
  },
  twitter: {
    images: "https://valentinjadot.com/og-image-with-text.jpg",
    card: "summary_large_image",
    site: "https://valentinjadot.com",
    creator: "@jadorowski",
    title: "Valentin Jadot",
    description: "creative coder",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://analytics.us.umami.is/script.js"
          data-website-id="25195557-f00e-479a-b740-c49f5dbcd325"
        ></script>
      </head>
      <body
        className={inter.className}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100vw",
          margin: 0,
        }}
      >
        <main>
          <CurrentUserProvider>{children}</CurrentUserProvider>
        </main>
      </body>
      <GoogleAnalytics gaId="G-8EJTB5152E" />
    </html>
  );
}
