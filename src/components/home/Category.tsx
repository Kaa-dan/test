"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

const LargeScreenCategories: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const router = useRouter();

  const handleCategoryClick = (category: Category): void => {
    router.push(`/category/${category._id}`);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      className="hidden lg:grid grid-cols-4 gap-6"
    >
      {categories.map((category, index) => (
        <motion.div
          key={category._id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
          className={`${
            index === 0
              ? "lg:col-span-2 lg:row-span-2"
              : "lg:col-span-1 lg:row-span-1"
          }`}
        >
          <motion.div
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="group bg-primary-white rounded-2xl p-8 h-full transition-all hover:shadow-lg cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="flex flex-col h-full">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-black mb-2">
                {category.name}
              </h2>
              <motion.div
                className={`relative ${
                  index === 0 ? "flex-1" : "h-[200px]"
                } mt-4 overflow-hidden rounded-xl`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src={category.photo}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex gap-3 mt-6 text-sm font-medium text-primary-black pb-1 hover:text-primary-orange hover:border-gray-700 transition-colors"
              >
                DISCOVER NOW <FaArrowRight className="mt-1" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const SmallScreenCategories: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const router = useRouter();

  const handleCategoryClick = (category: Category): void => {
    router.push(`/category/${category._id}`);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4"
    >
      {categories.map((category) => (
        <motion.div
          key={category._id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
          className="w-full"
        >
          <motion.div
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="bg-primary-white rounded-2xl p-4 h-full transition-all hover:shadow-lg cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-primary-black mb-2">
                {category.name}
              </h2>
              <div className="relative h-[200px] mt-2 overflow-hidden rounded-xl">
                <Image
                  src={category.photo}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain"
                />
              </div>
              <div className="flex gap-2 mt-4 text-sm font-medium text-primary-black hover:text-primary-orange transition-colors">
                DISCOVER NOW <FaArrowRight className="mt-1" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
        );
        setCategories(response.data);
      } catch (err) {
        const error = err as any;
        setError(error.response?.data?.message || "Failed to fetch categories");
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-16 flex justify-center items-center">
        <div className="colorful-loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 flex justify-center items-center">
        <div className="text-xl font-semibold text-red-500">
          Error: {error || "Something went wrong"}
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#fafafa]">
      <div className="mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="cursor-default text-3xl md:text-4xl font-bold text-primary-black mb-4">
            Explore Our Collections
          </h2>
          <p className="cursor-default text-gray-600 mx-auto">
            Discover our carefully curated categories, each offering unique
            pieces that blend style with functionality.
          </p>
        </motion.div>

        <LargeScreenCategories categories={categories} />
        <SmallScreenCategories categories={categories} />
      </div>
    </section>
  );
};

export default Category;