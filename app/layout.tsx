import { Space_Grotesk } from "next/font/google";
import './globals.css';
import NavBar from "@/components/nav-bar";
import Lenis from "@/components/lenis";
import Footer from "@/components/footer";
import { Metadata } from "next";
import ScrollToTop from "@/components/scroll-to-top";

export const metadata: Metadata = {
  title: "DigiPlus IT – AI-Driven Digital Solutions",
  description:
    "Transforming enterprises with AI-driven digital solutions, scalable technology, and modern web experiences.",
  keywords: [
    "digital transformation",
    "AI solutions",
    "enterprise software",
    "Next.js development",
    "web development",
    "digital innovation",
  ],
  openGraph: {
    title: "DigiPlus IT – AI-Driven Digital Solutions",
    description:
      "Transforming enterprises with AI-driven digital solutions and scalable technology innovation.",
    url: "https://digiplusit.com",
    siteName: "DigiPlus IT",
    locale: "en_US",
    type: "website",
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
        <ScrollToTop />
        <NavBar />
        <Lenis>
          {children}
        </Lenis>
        <Footer />
      </body>
    </html>
  );
}