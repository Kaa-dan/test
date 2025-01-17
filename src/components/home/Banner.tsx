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
      className="bg-primary-black w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:w-1/2 text-white"
            >
              <motion.h1
                className="text-[80px] font-bold leading-tight mb-6 tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {banners[currentSlide].title}
              </motion.h1>

              <motion.p
                className="mb-8 text-lg max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {banners[currentSlide].description}
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-orange text-white font-semibold py-3 px-12 rounded-full shadow-lg uppercase relative overflow-hidden group"
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
              className="md:w-1/2 mt-10 md:mt-0 flex justify-end relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-[600px] h-[500px]">
                <Image
                  src={banners[currentSlide].imageSrc}
                  alt={banners[currentSlide].title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="absolute bottom-10 left-0 right-0 flex justify-center gap-4"
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
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? "bg-white" : "bg-gray-500"
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
