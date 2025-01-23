"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import en from "../../locals/en.json";

const AboutBanner = () => {
  const { aboutBanner } = en;

  return (
    <motion.div
      // className="bg-primary-black w-full min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-primary-black w-full relative overflow-hidden mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-white leading-tight mb-6">
              {aboutBanner.title}
            </h1>
            <p className="text-lg sm:text-xl text-primary-white leading-relaxed mb-8">
              {aboutBanner.description}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-orange text-primary-white font-semibold py-3 px-8 rounded-full shadow-lg uppercase transition-all"
            >
              {aboutBanner.buttonText}
            </motion.button>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[500px]">
              <Image
                src={aboutBanner.imageSrc}
                alt={aboutBanner.title}
                fill
                className="object-contain rounded-xl shadow-lg"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 z-[-1]"
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
