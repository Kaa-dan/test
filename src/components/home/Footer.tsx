import Link from "next/link";
import { FC } from "react";
import { TbClockBitcoin, TbLocationDiscount } from "react-icons/tb";
import { BiPhoneIncoming } from "react-icons/bi";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <footer className="bg-primary-black w-full text-primary-white py-16 px-4 md:px-8">
      <div className="mx-auto flex flex-wrap justify-between gap-8">
        {/* Brand Section */}
        <div className="space-y-6 w-full sm:w-auto">
          <Link href="/">
            <div className="relative w-52 h-16 mx-auto md:mx-0">
              <Image
                src="/assets/logo.png"
                alt="Zap Store Logo"
                layout="fill"
                objectFit="contain"
                priority
                className="rounded-md"
              />
            </div>
          </Link>
          <p className="cursor-default text-primary-white leading-relaxed text-center md:text-left">
            Discover quality products at unbeatable prices. Your satisfaction is
            our priority.
          </p>

          <div className="cursor-default space-y-4 text-sm text-primary-white">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <TbLocationDiscount className="w-6 h-6 text-primary-orange" />
              <span>Jln. Raya Nusa Dua, Bali 80361</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <TbClockBitcoin className="w-6 h-6 text-primary-orange" />
              <span>Sun - Sat: 9:00 AM - 8:00 PM</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <BiPhoneIncoming className="w-6 h-6 text-primary-orange" />
              <span>(+62) 81 32 539 780</span>
            </div>
          </div>
        </div>

        {/* Other Pages Section */}
        <div className="space-y-4 w-full sm:w-auto">
          <h3 className="cursor-default text-lg font-semibold text-primary-white text-center md:text-left">
            Other Pages
          </h3>
          <nav className="space-y-2 text-center md:text-left">
            <Link
              href={"/"}
              className="block hover:text-primary-orange transition-colors"
            >
              Home
            </Link>
            <Link
              href={"/about"}
              className="block hover:text-primary-orange transition-colors"
            >
              About Us
            </Link>
          </nav>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4 w-full sm:w-auto">
          <h3 className="cursor-default text-lg font-semibold text-primary-white text-center md:text-left">
            Quick Links
          </h3>
          <nav className="space-y-2 text-center md:text-left">
            {["Privacy", "Terms", "Help"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="block hover:text-primary-orange transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-8 border-t border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="cursor-default text-sm">
            &copy; {new Date().getFullYear()} Zap Store. All rights reserved.
          </p>
          <div className="text-sm">
            <Link
              href="https://zikrabyte.com/"
              className="hover:text-primary-orange"
            >
              &copy; Developed By ZikraByte Solutions.
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
