import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductList from "@/components/ProductList";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

async function getCategory(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return undefined;
  return res.json();
}

async function getProductsByCategory(id: string): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${id}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const categoryPromise = getCategory(params.id);
  const productsPromise = getProductsByCategory(params.id);

  const [category, products] = await Promise.all([
    categoryPromise,
    productsPromise,
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList products={products} />
      </Suspense>
    </div>
  );
}
