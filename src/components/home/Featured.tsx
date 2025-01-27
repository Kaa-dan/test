"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFeaturedProducts } from "@/components/hooks/product-hooks";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/components/contexts/CardContext";
import { ShoppingCartIcon } from "lucide-react";
import en from "../../locals/en.json";

interface Product {
  _id: string;
  name: string;
  basePrice: number;
  discountPrice?: number;
  images: string[];
  isAvailable: boolean;
  slug: string;
}

const Featured = () => {
  const { shop } = en;

  const { data: products, isLoading, error } = useFeaturedProducts();
  const { addToCart } = useCart();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupProduct, setPopupProduct] = useState<Product | null>(null);
  const productsPerPage = 6;

  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  const handleAddToCart = (product: Product) => {
    const priceToAdd =
      product.discountPrice &&
      product.discountPrice > 0 &&
      product.discountPrice < product.basePrice
        ? product.basePrice - product.discountPrice
        : product.basePrice;

    addToCart({
      _id: product._id,
      name: product.name,
      price: priceToAdd,
      quantity: 1,
      image: product.images[0],
    });

    setPopupProduct(product);
    setPopupVisible(true);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[600px]">
        <div className="flex items-center justify-center h-[500px] bg-primary-black">
          <div className="colorful-loader"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading featured products</div>;
  }

  if (!products || products.length === 0) {
    return <div>No featured products available</div>;
  }

  const availableProducts = products.filter((product) => product.isAvailable);
  const totalPages = Math.ceil(availableProducts.length / productsPerPage);
  const paginatedProducts = availableProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <section className="w-full mx-auto py-12 px-4">
      <h2 className="cursor-default text-3xl md:text-4xl font-bold text-center mb-12">
        FEATURED PRODUCTS
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-1 lg:col-span-2 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {paginatedProducts?.map((product) => (
            <motion.div
              key={product._id}
              variants={item}
              className="shadow-lg p-3 rounded-lg relative group"
            >
              <div
                onClick={() => handleProductClick(product.slug)}
                className="cursor-pointer"
              >
                {product.discountPrice &&
                  product.discountPrice > 0 &&
                  product.discountPrice < product.basePrice && (
                    <div className="absolute top-2 right-2 z-10 bg-primary-orange text-primary-white px-3 py-1 rounded-full text-sm">
                      Sale!
                    </div>
                  )}

                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <h3
                  className="text-lg font-semibold mb-2 line-clamp-1"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  {product.discountPrice &&
                  product.discountPrice > 0 &&
                  product.discountPrice < product.basePrice ? (
                    <>
                      <span className="text-primary-black line-through">
                        ₹{product.basePrice.toFixed(2)}{" "}
                      </span>
                      <span className="text-primary-orange font-bold">
                        ₹
                        {(product.basePrice - product.discountPrice).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-primary-orange font-bold">
                      ₹{product.basePrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="w-full relative bg-primary-black text-primary-white py-2 rounded-md hover:bg-primary-orange transition-colors"
              >
                <span className="text-sm flex items-center justify-center">
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  ADD TO CART
                </span>
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="hidden lg:flex bg-primary-black rounded-lg p-8 text-primary-white flex-col items-center justify-center text-center h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${shop.backgroundImage})`,
          }}
        >
          <h3 className="text-3xl font-bold mb-4 cursor-default">
            BEST PRODUCT DEALS!
          </h3>
          <p className="mb-8 cursor-default">
            Get a 20% Cashback when buying TWS Product From SoundPro Audio
            Technology.
          </p>
        </motion.div>
      </div>

      <div className="mt-12 flex flex-col items-center">
        <div className="flex items-center space-x-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`text-sm px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-primary-black text-white hover:bg-primary-orange"
            }`}
          >
            Previous
          </button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`text-sm px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-primary-black text-white hover:bg-primary-orange"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {popupVisible && popupProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">
              {popupProduct.name} added to your cart!
            </h3>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setPopupVisible(false)}
                className="w-full bg-gray-300 text-black py-2 rounded-md"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => router.push("/cart")}
                className="w-full bg-primary-black hover:bg-primary-orange text-white py-2 rounded-md"
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Featured;
