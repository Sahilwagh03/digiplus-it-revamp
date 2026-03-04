import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import Lenis from "@/components/lenis";
import Footer from "@/components/footer";
import { Metadata } from "next";
import ScrollToTop from "@/components/scroll-to-top";
import MouseTrail from "@/components/MouseTrail";

export const metadata: Metadata = {
  metadataBase: new URL("https://digiplusit.co.in"),

  title: {
    default: "DigiPlus IT – AI-Driven Telecom & Digital Transformation",
    template: "%s | DigiPlus IT",
  },

  description:
    "DigiPlus IT delivers AI-powered OSS/BSS modernization, telecom digital transformation, LLM integration, and cloud-native enterprise solutions trusted by global telecom leaders.",

  keywords: [
    "OSS BSS modernization",
    "telecom digital transformation",
    "AI telecom solutions",
    "5G network management",
    "network automation",
    "LLM integration enterprise",
    "AI agents automation",
    "cloud-native telecom",
    "DevOps automation",
    "enterprise software development",
    "digital transformation partner",
    "DigiPlus IT",
  ],

  alternates: {
    canonical: "https://digiplusit.co.in",
  },

  openGraph: {
    title: "DigiPlus IT – AI-Driven Telecom & Digital Transformation",
    description:
      "Enterprise OSS/BSS modernization, AI automation, and cloud-native solutions for global telecom leaders.",
    url: "https://digiplusit.co.in",
    siteName: "DigiPlus IT",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DigiPlus IT – AI-Driven Telecom Digital Transformation",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <MouseTrail />
        <ScrollToTop />
        <NavBar />
        <Lenis>{children}</Lenis>
        <Footer />
      </body>
    </html>
  );
}
