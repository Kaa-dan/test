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
  const { addToCart } = useCart();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupProduct, setPopupProduct] = useState<Product | null>(null);

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

  const handleAddToCart = (product: Product) => {
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

    setPopupProduct(product);
    setPopupVisible(true);
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

      <h3
        className="text-lg font-semibold mb-2 text-primary-black line-clamp-1"
        title={product.name}
      >
        {product.name}
      </h3>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-primary-black line-through">
          ₹{product.basePrice.toFixed(2)}
        </span>
        <span className="text-primary-orange font-bold">
          ₹{(product.basePrice - product.discountPrice).toFixed(2)}
        </span>
      </div>

      <button
        className="w-full bg-primary-black text-primary-white flex items-center justify-center gap-2 py-2 rounded-md hover:bg-primary-orange transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart(product);
        }}
      >
        <ShoppingCartIcon className="w-5 h-5" />
        <span>ADD TO CART</span>
      </button>
    </div>
  );

  return (
    <div className="mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">HOT DEALS</h1>

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
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(renderProductCard)}
        </div>
      )}

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
    </div>
  );
};

export default Deals;
