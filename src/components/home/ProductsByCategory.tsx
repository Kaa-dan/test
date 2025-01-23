"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/contexts/CardContext";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
}

const ProductsByCategory = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div key={product._id} className="border rounded-lg p-4 flex flex-col">
          <Link href={`/product/${product._id}`}>
            <div className="relative h-48 mb-4">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          </Link>
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
            className="mt-auto w-full bg-primary-orange text-primary-white py-2 rounded-md hover:bg-primary-orange/80 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductsByCategory;
