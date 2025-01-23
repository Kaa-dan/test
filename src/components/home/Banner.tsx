"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useBanners } from "@/components/hooks/homepage-hooks"; // Importing the custom hook

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Using the custom `useBanners` hook
  const {
    data: banners = [],
    isLoading,
    error,
  } = useBanners();

  // Auto-slide logic
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000); // Slide every 6 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-primary-black">
      <div className="colorful-loader"></div>
    </div>
    
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-primary-black">
        <div className="text-white">Error: {error.message}</div>
      </div>
    );
  }

  // Handle empty banners
  if (banners.length === 0) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-primary-black">
        <div className="text-white">No banners available</div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-primary-black w-full h-fit">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-hidden bg-primary-black w-full relative mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Text Section */}
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
                  {banners[currentSlide].heading}
                </motion.h1>

                <motion.p
                  className="mb-6 lg:mb-8 text-base sm:text-lg max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {banners[currentSlide].subHeading}
                </motion.p>

                <motion.a
                  // href={banners[currentSlide].buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-primary-orange text-primary-white font-semibold py-2 sm:py-3 px-8 sm:px-12 rounded-full shadow-lg uppercase relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {banners[currentSlide].buttonTxt}
                  </span>
                </motion.a>
              </motion.div>
            </AnimatePresence>

            {/* Image Section */}
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
                    src={banners[currentSlide].image}
                    alt={banners[currentSlide].heading}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 400px, (max-width: 1024px) 500px, 600px"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
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
      </motion.div>
    </div>
  );
};

export default Banner;
