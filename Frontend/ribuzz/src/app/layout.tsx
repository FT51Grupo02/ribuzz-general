import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { FooterWithSitemap } from "@/components/Footer/Footer";
import { AuthProvider } from "@/components/Context/AuthContext";
import { CartProvider } from "@/components/Context/CartContext";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "RiBuzz",
  description: "Conectando emprendedores apasionados con oportunidades",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="description" content="RiBuzz" />
        <title>RiBuzz</title>
      </head>
      <body className="flex flex-col min-h-screen">
        
            <AuthProvider>
              <CartProvider>
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
                <FooterWithSitemap />
              </CartProvider>
            </AuthProvider>
          
      </body>
    </html>
  );
}
