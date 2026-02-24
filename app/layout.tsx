
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import Lenis from "@/components/lenis";
import Footer from "@/components/footer";

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
          <NavBar />
        <Lenis>
          {children}
        </Lenis>
        <Footer />
      </body>
    </html>
  );
}
