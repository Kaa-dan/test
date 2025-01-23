"use client";
import { useProducts } from "@/components/hooks/product-hooks";
import { useCart } from "@/components/contexts/CardContext";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
  discountPrice: number;
  images: string[];
  category: string;
}

// Add props interface
interface ProductListProps {
  products?: Product[];
}

// Update component to accept props
export default function ProductList({
  products: initialProducts,
}: ProductListProps) {
  const { data: fetchedProducts, isLoading, error } = useProducts();
  const { addToCart } = useCart();

  const products = initialProducts || fetchedProducts;

  if (isLoading && !initialProducts) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-orange"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products?.map((product) => (
        <div
          key={product._id}
          className="border rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow"
        >
          <Link href={`/product/${product._id}`}>
            <div className="relative h-48 mb-4">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Sale Badge */}
              {product.discountPrice &&
                product.discountPrice < product.basePrice && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    SALE
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
          </div>
        </div>
      ))}
    </div>
  );
}
