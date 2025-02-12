import { Providers } from "./providers";
import "./globals.css";

// import { AuthProvider } from "./auth/authContext";

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

            <main className="">{children}</main>

          </div>
        </Providers>

      </body>
    </html >
  );
}
