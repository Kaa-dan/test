import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { TbClockBitcoin, TbLocationDiscount } from "react-icons/tb";
import { BiPhoneIncoming } from "react-icons/bi";
import { IoSend } from "react-icons/io5";

const Footer: FC = () => {
  return (
    <footer className="bg-primary-black text-primary-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">NOIZ</h2>
          <p className="text-primary-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec.
          </p>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <TbLocationDiscount className="w-5 h-5" />
              Jln. Raya Nusa Dua, Bali 80361
            </p>
            <p className="flex items-center gap-2">
              <TbClockBitcoin className="w-5 h-5" />
              Sun - Sat : 9:00 AM - 20:00 PM
            </p>
            <p className="flex items-center gap-2">
              <BiPhoneIncoming className="w-5 h-5" />
              (+62)81 32 539 780
            </p>
          </div>
        </div>

        {/* Other Pages */}
        <div>
          <h3 className="text-xl font-semibold mb-4">OTHER PAGES</h3>
          <nav className="space-y-2">
            {["Home", "About Us"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="block text-primary-white hover:text-primary-orange transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">QUICK LINKS</h3>
          <nav className="space-y-2">
            {["Returns & refunds", "Order tracking", "Cart"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="block text-primary-white hover:text-primary-orange transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">NEWSLETTER</h3>
          <p className="text-primary-white mb-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 px-4 py-2 rounded-l-md focus:outline-none text-primary-black"
            />
            <button
              type="submit"
              className="bg-primary-orange px-4 py-2 rounded-r-md transition-colors"
            >
              <IoSend className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4"></div>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-primary-white hover:text-primary-orange"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-primary-white hover:text-primary-orange"
            >
              Terms
            </Link>
            <Link
              href="/help"
              className="text-primary-white hover:text-primary-orange"
            >
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
