import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import ClientWrapper from "./ClientWrapper";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundFX from "@/components/layout/BackgroundFX";
import WaterDistortion from "@/components/animations/WaterDistortion";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashish Kumar Thakur | Software Developer",
  description:
    "Software Developer skilled in MERN stack development, RESTful APIs, and scalable web applications. Full stack developer specializing in React.js, Node.js, MongoDB, and PostgreSQL.",
  keywords: [
    "Software Developer",
    "MERN Stack",
    "Full Stack Developer",
    "React.js",
    "Node.js",
    "JavaScript",
    "Ashish Kumar Thakur",
  ],
  openGraph: {
    title: "Ashish Kumar Thakur | Software Developer",
    description:
      "MERN stack developer building scalable web applications and RESTful APIs.",
    type: "website",
    locale: "en_US",
    url: "https://ashishthakur.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Kumar Thakur | Software Developer",
    description:
      "MERN stack developer building scalable web applications and RESTful APIs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0705",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <BackgroundFX />
        <ClientWrapper>
          <Providers>
            <Navbar />
            <main className="flex-1">
              <WaterDistortion>{children}</WaterDistortion>
            </main>
            <Footer />
          </Providers>
        </ClientWrapper>
      </body>
    </html>
  );
}