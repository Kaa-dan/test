"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/contexts/CardContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { cart } = useCart();
  const router = useRouter();

  const token = localStorage.getItem('token')
  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT US" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{"name": ""}') : { name: "" };
  const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : "?";

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="w-full h-full z-50">
      <div className="bg-primary-black w-full py-2">
        <div className="mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image
                src="/assets/logo.png"
                alt="Zap Store Logo"
                className="h-14 w-40 object-contain"
                width={100}
                height={100}
              />
            </Link>
            {/* Social Media Links */}
            <div className="hidden lg:flex space-x-6">
              <Link
                href="#"
                className="text-primary-white text-base hover:text-gray-200"
              >
                Facebook
              </Link>
              <Link
                href="#"
                className="text-primary-white text-base hover:text-gray-200"
              >
                Twitter
              </Link>
              <Link
                href="#"
                className="text-primary-white text-base hover:text-gray-200"
              >
                Instagram
              </Link>
              {!token && <Link href='/login' className="text-primary-white text-base hover:text-gray-200">
                Login</Link>}

              {/* {} */}
              {token && <div className="relative">
                <div
                  className="w-8 h-8 rounded-full bg-primary-white text-primary-black flex items-center justify-center cursor-pointer font-semibold"
                  onClick={() => setShowLogout(prev => !prev)}

                >
                  {firstLetter}
                </div>
                {showLogout && (
                  <div
                    className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50"
                    onMouseEnter={() => setShowLogout(true)}
                    onMouseLeave={() => setShowLogout(false)}
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => router.push('/orders')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      profile
                    </button>
                  </div>
                )}
              </div>}

            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-6 py-4 bg-primary-black">
        <nav className="bg-primary-white rounded-full shadow-lg">
          <div className="px-8 py-4">
            <div className="flex justify-between items-center">
              <button
                suppressHydrationWarning={true}
                className="text-gray-600 hover:text-primary-orange lg:hidden"
                onClick={toggleSidebar}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div className="hidden lg:flex items-center space-x-8">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={`text-base font-semibold text-primary-black hover:text-primary-orange transition-colors ${link.href === "/" ? "" : ""
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-6">
                <Link
                  href="/cart"
                  className="text-primary-black text-base hover:text-primary-orange relative"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-orange text-primary-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-primary-black bg-opacity-50"
            onClick={toggleSidebar}
          ></div>
          <div className="absolute left-0 top-0 h-full w-80 bg-primary-white text-primary-black">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <Link href="/">
                  <Image
                    src="/assets/logo.png"
                    alt="Zap Store Logo"
                    className="h-14 w-40 object-contain bg-primary-black rounded-lg"
                    width={100}
                    height={100}
                  />
                </Link>
                <button
                  suppressHydrationWarning={true}
                  onClick={toggleSidebar}
                  className="text-primary-black"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block text-base text-primary-black hover:text-primary-orange"
                    onClick={toggleSidebar}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
