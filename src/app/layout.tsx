import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        url: "https://valentinjadot.com/og-image.png",
        width: 1190,
        height: 1000,
        alt: "Valentin Jadot",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ width: "100vw", height: "100vh", margin: 0 }}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
