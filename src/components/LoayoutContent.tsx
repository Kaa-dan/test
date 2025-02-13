import { usePathname } from "next/navigation";
import Footer from "./home/Footer";
import Navbar from "./home/Navbar";

// Create a client component for the layout content since usePathname is a hook


export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    return (
        <div className="min-h-screen">
            {!isLoginPage && <Navbar />}
            <main className="">{children}</main>
            {!isLoginPage && <Footer />}
        </div>
    );
}
