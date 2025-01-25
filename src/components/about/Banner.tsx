"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import en from "../../locals/en.json";

const AboutBanner = () => {
  const { aboutBanner } = en;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="bg-primary-black w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-12">
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-white leading-tight mb-4 sm:mb-6">
              {aboutBanner.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-primary-white leading-relaxed mb-6 sm:mb-8">
              {aboutBanner.description}
            </p>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
              <Image
                src={aboutBanner.imageSrc}
                alt={aboutBanner.title}
                fill
                className="object-contain rounded-xl shadow-lg"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="fixed inset-0 -z-10"
        animate={{
          background: [
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(240,240,240,1) 100%)",
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-gray-100 opacity-70" />
      </motion.div>
    </motion.div>
  );
};

export default AboutBanner;
