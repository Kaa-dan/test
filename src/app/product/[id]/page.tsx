import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";

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

async function getProduct(id: string): Promise<Product | undefined> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return undefined;
  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // Await params correctly
  const { id } = await params;
  
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="w-full overflow-hidden">
      <Suspense fallback={<div>Loading product details...</div>}>
        <ProductDetails product={product} />
      </Suspense>
    </div>
  );
}