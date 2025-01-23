"use client";
import { useState } from "react";
import Image from "next/image";
import {
  useProduct,
  useRelatedProducts,
} from "@/components/hooks/product-hooks";
import { useCart } from "@/components/contexts/CardContext";
import { Tab } from "@headlessui/react";
import { Star, Truck, Shield, RefreshCw } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  specifications?: Record<string, string>;
  stock?: number;
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

  const { addToCart } = useCart();
  const { data: relatedProducts } = useRelatedProducts(
    product?._id || "",
    product?.category || ""
  );

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
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
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <span className="text-gray-500">(128 reviews)</span>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.specifications &&
                Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b pb-4">
                    <dt className="font-medium text-gray-900">{key}</dt>
                    <dd className="mt-1 text-gray-600">{value}</dd>
                  </div>
                ))}
            </div>
          </Tab.Panel>
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

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} className="border rounded-lg p-4">
                <div className="relative h-48 mb-4">
                  <Image
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 className="font-medium">{relatedProduct.name}</h3>
                <p className="text-gray-600 mt-2">
                  ${relatedProduct.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
