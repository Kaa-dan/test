"use client";
import { type FC, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/contexts/CardContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCartIcon } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  images: string[];
  basePrice: number;
  discountPrice: number;
  description: string;
  isActive: boolean;
  isAvailable: boolean;
  category: string;
  slug: string;
}

const Deals: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const [addedToCartItem, setAddedToCartItem] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const hotDeals = data
          .filter(
            (product: Product) =>
              product.isActive &&
              product.isAvailable &&
              product.discountPrice > 0
          )
          .slice(0, 4);
        setProducts(hotDeals);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  if (loading) {
    return (
      <div className="mx-auto px-4 py-12">
        <div className="flex items-center justify-center h-[500px] bg-primary-black">
          <div className="colorful-loader"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto px-4 py-12">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  const renderProductCard = (product: Product) => (
    <div
      key={product._id}
      className="bg-primary-white rounded-lg shadow-lg p-6 relative cursor-pointer w-full"
      onClick={() => handleProductClick(product.slug)}
    >
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-primary-orange text-primary-white px-3 py-1 rounded-full text-sm">
          Sale!
        </span>
      </div>

      <div className="relative h-48 mb-4 z-0">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2 text-primary-black">
        {product.name}
      </h3>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-primary-black line-through">
        ₹{product.basePrice.toFixed(2)}{" "}
        </span>
        <span className="text-primary-orange font-bold">
        ₹{(product.basePrice - product.discountPrice).toFixed(2)}
        </span>
      </div>

      <button
        className="w-full relative bg-primary-black text-primary-white py-2 rounded-md hover:bg-primary-orange transition-colors"
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

          setAddedToCartItem(product._id);
          setTimeout(() => {
            setAddedToCartItem(null);
          }, 2000);
        }}
      >
        <AnimatePresence mode="wait">
          {addedToCartItem === product._id ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="block text-sm"
            >
              Added
            </motion.span>
          ) : (
            <motion.span
              key="add-to-cart"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm flex items-center justify-center"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              ADD TO CART
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );

  return (
    <div className="mx-auto px-4 py-12">
      <h1 className="cursor-default text-4xl font-bold text-center mb-12">
        HOT DEALS
      </h1>

      {isMobile ? (
        <div className="relative flex items-center justify-center">
          <button
            onClick={handlePrevious}
            className="absolute left-0 z-10 bg-primary-black/50 text-white p-2 rounded-full"
          >
            <ChevronLeft />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="w-full max-w-sm"
            >
              {renderProductCard(products[currentIndex])}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handleNext}
            className="absolute right-0 z-10 bg-primary-black/50 text-white p-2 rounded-full"
          >
            <ChevronRight />
          </button>

          <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex
                    ? "bg-primary-black w-6"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(renderProductCard)}
        </div>
      )}
    </div>
  );
};

export default Deals;
