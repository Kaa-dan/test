"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useProduct } from "@/components/hooks/product-hooks";
import { useCart } from "@/components/contexts/CardContext";
import { Tab } from "@headlessui/react";
import { Truck, Shield, RefreshCw, ShoppingCartIcon } from "lucide-react";
import ProductReviews from "./ProductReviews";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
  discountPrice: number;
  images: string[];
  category: string;
  slug: string;
}

interface ProductDetailsProps {
  product?: Product;
  productId?: string;
}

export default function ProductDetails({
  product: initialProduct,
  productId,
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { data: fetchedProduct, isLoading } = useProduct(productId || "");
  const product = initialProduct || fetchedProduct;
  const [addedToCartItem] = useState<boolean>(false);
  const router = useRouter();

  const { addToCart, appliedCoupon } = useCart();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupProduct, setPopupProduct] = useState<Product | null>(null);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!product) return;

    let price = product.discountPrice * quantity;
    if (appliedCoupon) {
      const discount = (price * appliedCoupon.percentage) / 100;
      price = price - discount;
    }
  }, [product, quantity, appliedCoupon]);

  const handleAddToCart = () => {
    if (!product) return;

    const price = product.discountPrice
      ? product.basePrice - product.discountPrice
      : product.basePrice;

    addToCart({
      _id: product._id,
      name: product.name,
      price: price,
      quantity,
      image: product.images[0],
    });

    setPopupProduct(product);
    setPopupVisible(true);
  };

  if (isLoading || !product) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="colorful-loader"></div>
      </div>
    );
  }

  return (
    <div className="p-12">
      {/* Product Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 md:h-24 lg:h-28 rounded-md overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-primary-orange"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 25vw, 15vw"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-600 text-sm md:text-base">
            {product.description}
          </p>

          {/* Price Section */}
          <div className="space-y-2">
            {product.discountPrice &&
              product.discountPrice < product.basePrice && (
                <div className="text-lg md:text-xl text-gray-500 line-through">
                  ₹{product.basePrice.toFixed(2)}
                </div>
              )}
            <div className="text-xl md:text-3xl font-bold">
              ₹
              {product.discountPrice
                ? (product.basePrice - product.discountPrice).toFixed(2)
                : product.basePrice.toFixed(2)}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label className="font-medium">Quantity:</label>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border-r hover:bg-gray-50"
              >
                &#45;
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 text-center focus:outline-none"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border-l hover:bg-gray-50"
              >
                &#43;
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary-orange text-white py-4 rounded-md hover:bg-primary-orange/90 transition-colors"
          >
            <AnimatePresence mode="wait">
              {addedToCartItem ? (
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
                <span className="flex items-center justify-center">
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </span>
              )}
            </AnimatePresence>
          </button>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="flex items-center space-x-3">
              <Truck className="w-6 h-6 text-gray-600" />
              <div>
                <p className="font-medium text-xs sm:text-sm">Free Shipping</p>
                <p className="text-xs text-gray-500">On orders over ₹100</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-gray-600" />
              <div>
                <p className="font-medium text-xs sm:text-sm">
                  2 Year Warranty
                </p>
                <p className="text-xs text-gray-500">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-6 h-6 text-gray-600" />
              <div>
                <p className="font-medium text-xs sm:text-sm">30 Day Returns</p>
                <p className="text-xs text-gray-500">Hassle-free returns</p>
              </div>
            </div>
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
      </div>

      {/* Product Details Tabs */}
      <Tab.Group>
        <Tab.List className="flex space-x-2 sm:space-x-4 border-b overflow-x-auto">
          <Tab
            suppressHydrationWarning={true}
            className={({ selected }) =>
              `py-2 px-4 sm:py-4 sm:px-6 text-sm font-medium focus:outline-none ${
                selected
                  ? "text-primary-orange border-b-2 border-primary-orange"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            Description
          </Tab>
          <Tab
            className={({ selected }) =>
              `py-2 px-4 sm:py-4 sm:px-6 text-sm font-medium focus:outline-none ${
                selected
                  ? "text-primary-orange border-b-2 border-primary-orange"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            Reviews
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-6">
          <Tab.Panel>
            <div className="space-y-6 text-sm md:text-base">
              {product.description}
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="space-y-6">
              <ProductReviews productId={product._id} />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
