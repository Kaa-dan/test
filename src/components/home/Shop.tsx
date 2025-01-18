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
      className="w-full h-[600px] bg-cover bg-center bg-fixed py-16 px-6 flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${shop.backgroundImage})`,
      }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl w-full">
        <motion.div
          className="flex-shrink-0 relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover="hover"
          variants={imageVariants}
        >
          <div className="relative group">
            <Image
              src={shop.productImage}
              alt="Product Image"
              width={500}
              height={500}
              className="object-contain rounded-xl shadow-2xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </div>
        </motion.div>

        <motion.div
          className="text-center lg:text-left text-primary-white max-w-xl"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            {shop.title}
          </h1>
          <h2 className="text-2xl font-semibold mb-4 text-primary-orange">
            {shop.price}
          </h2>
          <p className="text-base leading-relaxed mb-8 text-primary-white">
            {shop.description}
          </p>
          <motion.button
            suppressHydrationWarning={true}
            className="px-8 py-4 bg-primary-white text-primary-black font-semibold rounded-lg shadow-xl 
                     hover:bg-primary-orange transform transition-all duration-300"
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
