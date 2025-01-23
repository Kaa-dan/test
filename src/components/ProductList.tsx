"use client";
import { useProducts } from "@/components/hooks/product-hooks";
import { useCart } from "@/components/contexts/CardContext";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

// Add props interface
interface ProductListProps {
  products?: Product[];
}

// Update component to accept props
export default function ProductList({ products: initialProducts }: ProductListProps) {
  const { data: fetchedProducts, isLoading, error } = useProducts();
  const { addToCart } = useCart();
  
  // Use provided products or fetched products
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
        <div key={product._id} className="border rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow">
          <Link href={`/product/${product._id}`}>
            <div className="relative h-48 mb-4">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          </Link>
          <div className="mt-auto">
            <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
            <button
              onClick={() =>
                addToCart({
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: product.images[0],
                })
              }
              className="w-full bg-primary-orange text-white py-2 px-4 rounded hover:bg-primary-orange/80 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}