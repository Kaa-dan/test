"use client";
import { useProducts } from "@/components/hooks/product-hooks";
import { useCart } from "@/components/contexts/CardContext";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
  discountPrice: number;
  images: string[];
  category: string;
  createdAt?: string;
  updatedAt?: string;
  isActive: boolean;
  isAvailable: boolean;
  slug: string;
}

// Add props interface
interface ProductListProps {
  products?: Product[];
}

// Update component to accept props
export default function ProductList({
  products: initialProducts,
}: ProductListProps) {
  const { data: fetchedProducts, isLoading } = useProducts();
  const { addToCart } = useCart();
  const [addedToCartItem ] = useState<string | null>(null);

  const products = initialProducts || fetchedProducts;
  const router = useRouter();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupProduct, setPopupProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading && !initialProducts) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="flex items-center justify-center h-[500px] bg-primary-black">
          <div className="colorful-loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="py-8 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow"
          >
            <Link href={`/product/${product.slug}`}>
              <div className="relative h-48 mb-4">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain rounded-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Sale Badge */}
                {product.discountPrice &&
                  product.discountPrice < product.basePrice && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-primary-orange text-primary-white px-3 py-1 rounded-full text-sm">
                        Sale!
                      </span>
                    </div>
                  )}
              </div>
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            </Link>
            <div className="mt-auto">
              <div className="flex items-center gap-2 mb-4">
                {product.discountPrice &&
                product.discountPrice > 0 &&
                product.discountPrice < product.basePrice ? (
                  <>
                    <span className="text-primary-black line-through">
                      ₹{product.basePrice.toFixed(2)}{" "}
                    </span>
                    <span className="text-primary-orange font-bold">
                      ₹{(product.basePrice - product.discountPrice).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-primary-orange font-bold">
                    ₹{product.basePrice.toFixed(2)}
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

                  setPopupProduct(product);
                  setPopupVisible(true);
                }}
                className="w-full bg-primary-black text-primary-white py-2 rounded-md hover:bg-primary-orange transition-colors"
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
                    <span className="text-sm flex items-center justify-center">
                      <ShoppingCartIcon className="h-5 w-5 mr-2" />
                      ADD TO CART
                    </span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        ))}
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
    </div>
  );
}
