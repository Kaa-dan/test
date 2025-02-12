import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 ">
        <h1 className="text-3xl md:text-6xl font-bold text-gray-800">404</h1>
        <p className="text-base md:text-lg text-gray-600 mt-4">
          Oops! This page seems to have taken a wrong turn.
        </p>
        <p className="text-base md:text-lg text-gray-600 mt-2">
          But don&#39;t worry, we&#39;re experts at navigating back to the right
          path.
        </p>
        <p className="text-base md:text-lg text-gray-600 mt-2">
          Click below to return to the homepage, or feel free to explore more of
          what we do.
        </p>
        <Link href="/" passHref>
          <div className="mt-6 px-4 py-2 bg-secondary-blue text-white text-sm rounded-md hover:bg-primary-blue transition duration-300">
            🚀 Take me home!
          </div>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
