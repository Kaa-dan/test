import { Providers } from "./providers";
import "./globals.css";
import { ToastContainer, } from 'react-toastify';
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
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{
            fontSize: '14px',
            fontFamily: 'Mulish, sans-serif',
            textAlign: 'center'
          }}
          toastStyle={{
            backgroundColor: '#fff',
            color: '#333',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '12px 24px'
          }}
        />
      </body>
    </html >
  );
}
