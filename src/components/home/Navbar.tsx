"use client";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT US" },
    { href: "/shop", label: "SHOP" },
    { href: "/pages", label: "PAGES" },
    { href: "/contact", label: "CONTACT US" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  console.log("ntihin");
  return (
    <div className="w-full h-full z-50">
      {/* Top bar with logo and social links */}
      <div className="bg-primary-black w-full py-4">
        <div className="mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-white text-3xl font-bold">
              NOIZ
            </Link>
            <div className="hidden lg:flex space-x-6">
              <Link href="#" className="text-white hover:text-gray-200">
                Facebook
              </Link>
              <Link href="#" className="text-white hover:text-gray-200">
                Twitter
              </Link>
              <Link href="#" className="text-white hover:text-gray-200">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar with links */}
      <div className="mx-auto px-6 py-4 bg-primary-black">
        <nav className="bg-white rounded-full shadow-lg">
          <div className="px-8 py-4">
            <div className="flex justify-between items-center">
              {/* Hamburger menu for mobile */}
              <button
                className="text-gray-600 hover:text-blue-600 lg:hidden"
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

              {/* Main navigation for larger screens */}
              <div className="hidden lg:flex items-center space-x-8">
                {navLinks.slice(0, 3).map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={`text-gray-700 hover:text-blue-600 transition-colors ${
                      link.href === "/" ? "text-blue-600" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Search and Cart icons */}
              <div className="flex items-center space-x-6">
                <button className="text-gray-600 hover:text-blue-600">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <button className="text-gray-600 hover:text-blue-600">
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
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Sidebar for smaller screens */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleSidebar}
          ></div>
          <div className="absolute left-0 top-0 h-full w-80 bg-blue-600 text-white">
            <div className="p-6">
              {/* Sidebar header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">NOIZ</h2>
                <button onClick={toggleSidebar} className="text-white">
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

              {/* Navigation links */}
              <div className="space-y-6">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block text-lg text-white hover:text-gray-300"
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
