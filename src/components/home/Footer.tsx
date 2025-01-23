import Link from "next/link";
import { FC } from "react";
import { TbClockBitcoin, TbLocationDiscount } from "react-icons/tb";
import { BiPhoneIncoming } from "react-icons/bi";
import { IoSend } from "react-icons/io5";

const Footer: FC = () => {
  return (
    <footer className="bg-primary-black text-primary-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-evenly">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">TECHYFI</h2>
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

        <div>
          <h3 className="text-xl font-semibold mb-4">QUICK LINKS</h3>
          <nav className="space-y-2">
            {["Privacy", "Terms", "Help"].map((item) => (
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
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4"></div>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-primary-white hover:text-primary-orange"
            >
              Developed By ZikrByte
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
