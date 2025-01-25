import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductList from "@/components/ProductList";
import CategoryBanner from "@/components/home/CategoryBanner";

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
  params: rawParams,
}: {
  params: { id: string };
}) {
  const { id } = await rawParams;

  const categoryPromise = getCategory(id);
  const productsPromise = getProductsByCategory(id);

  const [category, products] = await Promise.all([
    categoryPromise,
    productsPromise,
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="w-full overflow-hidden">
      <CategoryBanner categoryName={category.name} />
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList products={products} />
      </Suspense>
    </div>
  );
}
