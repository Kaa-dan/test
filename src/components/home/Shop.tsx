"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import en from "../../locals/en.json";

const Shop = () => {
  const { shop } = en;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.3 },
    },
  };

  return (
    <div
      ref={ref}
      className="w-full min-h-[600px] bg-cover bg-center py-16 px-4 sm:px-6 flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${shop.backgroundImage})`,
      }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-7xl w-full px-4">
        <motion.div
          className="flex-shrink-0 relative w-full max-w-xs sm:max-w-md lg:max-w-lg"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover="hover"
          variants={imageVariants}
        >
          <div className="relative group w-full">
            <Image
              src={shop.productImage}
              alt="Product Image"
              layout="responsive"
              width={500}
              height={500}
              className="object-contain rounded-xl shadow-2xl"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          className="text-center lg:text-left text-primary-white max-w-xl w-full px-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            {shop.title}
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-primary-orange">
            {shop.price}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 text-primary-white">
            {shop.description}
          </p>
          <motion.button
            suppressHydrationWarning={true}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary-white text-primary-black font-semibold rounded-lg shadow-xl 
                     hover:bg-primary-orange transform transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {shop.cta}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Shop;
