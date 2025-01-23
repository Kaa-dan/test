"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFeaturedProducts } from "@/components/hooks/product-hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/components/contexts/CardContext";

interface Product {
  _id: string;
  name: string;
  basePrice: number;
  discountPrice?: number | null;
  isActive: boolean;
  isAvailable: boolean;
  images: string[];
}

const Featured = () => {
  const { data: products, isLoading, error } = useFeaturedProducts();
  const { addToCart } = useCart();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-orange"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading featured products</div>;
  }

  if (!products || products.length === 0) {
    return <div>No featured products available</div>;
  }

  // Filter out inactive products
  const availableProducts = products.filter((product) => product.isAvailable);

  // Pagination logic
  const totalPages = Math.ceil(availableProducts.length / productsPerPage);
  const paginatedProducts = availableProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <section className="w-full mx-auto py-12">
      <h2 className="text-4xl font-bold text-center mb-12">FEATURED PRODUCT</h2>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-2 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {paginatedProducts?.map((product) => (
            <motion.div
              onClick={() => handleProductClick(product._id)}
              key={product._id}
              variants={item}
              className="group relative cursor-pointer"
            >
              {/* Sale badge only when discount price is valid and less than base price */}
              {product.discountPrice &&
                product.discountPrice > 0 &&
                product.discountPrice < product.basePrice && (
                  <div className="absolute top-2 right-2 z-10 bg-primary-orange text-white px-2 py-1 rounded-full text-xs">
                    Sale!
                  </div>
                )}

              <motion.div
                whileHover="hover"
                variants={imageVariants}
                className="relative h-64 mb-4 bg-gray-100 rounded-lg overflow-hidden"
              >
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </motion.div>

              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                {product.discountPrice &&
                product.discountPrice > 0 &&
                product.discountPrice < product.basePrice ? (
                  <>
                    <span className="text-primary-black line-through">
                      ${product.basePrice.toFixed(2)}{" "}
                    </span>
                    <span className="text-primary-orange font-bold">
                      ${(product.basePrice - product.discountPrice).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-primary-orange font-bold">
                    ${product.basePrice.toFixed(2)}
                  </span>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const priceToAdd = product.discountPrice
                    ? product.basePrice - product.discountPrice
                    : product.basePrice;

                  addToCart({
                    _id: product._id,
                    name: product.name,
                    price: priceToAdd,
                    quantity: 1,
                    image: product.images[0],
                  });
                }}
                className="w-full bg-primary-black text-primary-white py-2 rounded-md hover:bg-primary-black/80 transition-colors"
              >
                ADD TO CART
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Sidebar or Marketing Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-primary-black rounded-lg p-8 text-white flex flex-col items-center justify-center text-center h-full"
        >
          <h3 className="text-4xl font-bold mb-4">BEST PRODUCT DEALS!</h3>
          <p className="mb-8">
            Get a 20% Cashback when buying TWS Product From SoundPro Audio
            Technology.
          </p>
          <Link
            href="/shop"
            className="border-2 border-white text-white py-2 px-6 rounded-md hover:bg-white hover:text-blue-600 transition-colors inline-block"
          >
            SHOP NOW
          </Link>
        </motion.div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded-md border ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary-black text-white hover:bg-primary-black/80"
          }`}
        >
          Previous
        </button>
        <span className="font-bold text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded-md border ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary-black text-white hover:bg-primary-black/80"
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Featured;
