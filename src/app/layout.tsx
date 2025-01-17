import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "TECHYFI",
  description: "Learn more about Techyfi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
