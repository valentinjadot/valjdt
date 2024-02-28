import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"], preload: true });

export const metadata: Metadata = {
  title: "Valentin Jadot",
  description: "creative coder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Valentin Jadot - creative coder" />
        <meta property="og:title" content="Valentin Jadot" />
        <meta property="og:description" content="creative coder" />
        <meta property="og:type" content="website" />

        <title>Valentin Jadot</title>
      </Head>
      <body
        className={inter.className}
        style={{ width: "100vw", height: "100vh", margin: 0 }}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
