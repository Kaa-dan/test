"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import en from "../../locals/en.json";
import { FaArrowRight } from "react-icons/fa";

const Category = () => {
  const { categories } = en;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 bg-[#fafafa]">
      <div className="max-w-[1440px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated categories, each offering unique
            pieces that blend style with functionality
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
        >
          {/* Large Featured Item */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 lg:row-span-2"
          >
            <motion.div
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group h-full bg-white rounded-2xl p-8 transition-all hover:shadow-lg"
            >
              <div className="flex flex-col h-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {categories[0].title}
                </h2>
                <motion.div
                  className="relative flex-1 mt-4 overflow-hidden rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Image
                    src={categories[0].image}
                    alt={categories[0].title}
                    fill
                    className="object-contain transition-all duration-500 group-hover:brightness-110"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-white"
                  />
                </motion.div>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={categories[0].link}
                  className="flex gap-3 mt-6 text-sm font-medium text-gray-900 pb-1 hover:text-gray-700 hover:border-gray-700 transition-colors"
                >
                  DISCOVER NOW <FaArrowRight className="mt-1" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Smaller Items */}
          {categories.slice(1).map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="lg:col-span-3 lg:row-span-1"
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="group bg-white rounded-2xl p-8 h-full transition-all hover:shadow-lg"
              >
                <div className="flex flex-col h-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {category.title}
                  </h2>
                  <motion.div
                    className="relative h-[200px] mt-4 overflow-hidden rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-contain transition-all duration-500 group-hover:brightness-110"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-white"
                    />
                  </motion.div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={category.link}
                    className="flex gap-3 mt-6 text-sm font-medium text-gray-900  pb-1 hover:text-gray-700 hover:border-gray-700 transition-colors"
                  >
                    DISCOVER NOW <FaArrowRight className="mt-1" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Category;
