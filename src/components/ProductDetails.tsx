"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useProduct } from "@/components/hooks/product-hooks";
import { useCart } from "@/components/contexts/CardContext";
import { Tab } from "@headlessui/react";
import { Star, Truck, Shield, RefreshCw } from "lucide-react";
import { useCoupons } from "@/components/hooks/product-hooks"; // Import useCoupons hook

interface Product {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
  discountPrice: number;
  images: string[];
  category: string;
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

  const { addToCart, appliedCoupon } = useCart(); // Extract appliedCoupon from CartContext
  const { data: coupons = [] } = useCoupons(); // Fetch available coupons

  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    if (!product) return;

    // Calculate price after discount if coupon is applied
    let price = product.discountPrice * quantity;
    if (appliedCoupon) {
      const discount = (price * appliedCoupon.percentage) / 100;
      price = price - discount;
    }
    setFinalPrice(price);
  }, [product, quantity, appliedCoupon]);

  const handleAddToCart = () => {
    if (!product) return;

    const finalPrice = product.discountPrice
      ? product.basePrice - product.discountPrice
      : product.basePrice;

    addToCart({
      _id: product._id,
      name: product.name,
      price: finalPrice,
      quantity,
      image: product.images[0],
    });
  };

  if (isLoading || !product) {
    return (
      <div className="flex justify-center items-center min-h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-orange"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-[500px] rounded-lg overflow-hidden ">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-24 rounded-md overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-primary-orange"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 15vw"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-600">{product.description}</p>

          {/* Price Section: Show both Discounted and Original Price */}
          <div className="space-y-2">
            {/* Show the Original Price */}
            {product.discountPrice &&
            product.discountPrice < product.basePrice ? (
              <div className="text-xl text-gray-500 line-through">
                ${product.basePrice.toFixed(2)} {/* Original Price */}
              </div>
            ) : null}{" "}
            {/* Only show original price if there's a discount */}
            {/* Show the Base Price or Final Price */}
            <div className="text-3xl font-bold">
              $
              {product.discountPrice
                ? (product.basePrice - product.discountPrice).toFixed(2)
                : product.basePrice.toFixed(2)}{" "}
              {/* Show final price after applying discount or base price if no discount */}
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
                -
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
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary-orange text-white py-4 rounded-md hover:bg-primary-orange/90 transition-colors"
          >
            Add to Cart
          </button>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="flex items-center space-x-3">
              <Truck className="w-6 h-6 text-gray-600" />
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-gray-500">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-gray-600" />
              <div>
                <p className="font-medium">2 Year Warranty</p>
                <p className="text-sm text-gray-500">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-6 h-6 text-gray-600" />
              <div>
                <p className="font-medium">30 Day Returns</p>
                <p className="text-sm text-gray-500">Hassle-free returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tab.Group>
        <Tab.List className="flex space-x-4 border-b">
          <Tab
            className={({ selected }) =>
              `py-4 px-6 text-sm font-medium focus:outline-none ${
                selected
                  ? "text-primary-orange border-b-2 border-primary-orange"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            Specifications
          </Tab>
          <Tab
            className={({ selected }) =>
              `py-4 px-6 text-sm font-medium focus:outline-none ${
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
            <div className="space-y-6">
              {/* Sample Reviews - Replace with actual reviews data */}
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      1 month ago
                    </span>
                  </div>
                  <h4 className="font-medium">John Doe</h4>
                  <p className="text-gray-600 mt-2">
                    Great product! Exactly what I was looking for. The quality
                    is excellent and it arrived quickly.
                  </p>
                </div>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
