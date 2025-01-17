"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import en from "../../locals/en.json";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { banners } = en;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <motion.div
      className="bg-primary-black w-full min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto px-4 py-4">
        <div className="p-7 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 text-white"
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-tight mb-4 lg:mb-6 tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {banners[currentSlide].title}
              </motion.h1>

              <motion.p
                className="mb-6 lg:mb-8 text-base sm:text-lg max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {banners[currentSlide].description}
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-primary-orange text-primary-white font-semibold py-2 sm:py-3 px-8 sm:px-12 rounded-full shadow-lg uppercase relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {banners[currentSlide].buttonText}
                </span>
                <motion.div
                  className="absolute inset-0 bg-primary-orange opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="w-full lg:w-1/2 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[500px]">
                <Image
                  src={banners[currentSlide].imageSrc}
                  alt={banners[currentSlide].title}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 400px, (max-width: 1024px) 500px, 600px"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="absolute bottom-4 sm:bottom-6 lg:bottom-10 left-0 right-0 flex justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {banners.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <motion.div
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  index === currentSlide ? "bg-primary-white" : "bg-gray-500"
                }`}
                initial={false}
                animate={{
                  scale: index === currentSlide ? 1.2 : 1,
                  opacity: index === currentSlide ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 z-[-1]"
        animate={{
          background: [
            "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,1) 100%)",
            "radial-gradient(circle, rgba(0,0,30,0.8) 0%, rgba(0,0,0,1) 100%)",
            "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,1) 100%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-blue-900 to-black opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black opacity-80" />
      </motion.div>
    </motion.div>
  );
};

export default Banner;
