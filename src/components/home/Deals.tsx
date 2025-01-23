"use client";
import { type FC, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/contexts/CardContext";

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
}

const Deals: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { addToCart } = useCart();

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
        // Filter for active, available products with discount
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

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="mx-auto px-4 py-12">
        <div className="text-center">Loading deals...</div>
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

  return (
    <div className="mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Hot Deals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-primary-white rounded-lg shadow-lg p-6 relative cursor-pointer"
            onClick={() => handleProductClick(product._id)}
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

            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary-black line-through">
                ${product.basePrice.toFixed(2)}{" "}
              </span>
              <span className="text-primary-orange font-bold">
                ${(product.basePrice - product.discountPrice).toFixed(2)}
              </span>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
