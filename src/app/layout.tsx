import { Providers } from "./providers";
import "./globals.css";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export const metadata = {
  title: "ZAP STORE",
  description: "Learn more about Zap Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <div className="min-h-screen">
            <Navbar />
            <main className="">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
