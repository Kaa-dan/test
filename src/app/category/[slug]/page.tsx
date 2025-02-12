import { notFound } from "next/navigation";
import ProductList from "@/components/ProductList";
import CategoryBanner from "@/components/home/CategoryBanner";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

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
  createdAt?: string;
  updatedAt?: string;
  slug: string;
}

async function getCategory(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories/get-by-slug/${slug}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return undefined;
    return res.json();
  } catch (error) {
    console.log("errr ", error);
  }
}

async function getProductsByCategory(slug: string): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${slug}`,
    {
      next: { revalidate: 60 },
    }
  );
  console.log({ res });
  if (!res.ok) return [];
  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log({ slug });

  const category = await getCategory(slug);
  const products = await getProductsByCategory(slug);

  console.log({ category, products });

  console.log("ccccc ", category);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Navbar />


      <div className="w-full overflow-hidden">
        {/* hhehehenieieiei */}
        <CategoryBanner categoryName={category.name} />
        <ProductList products={products} />
      </div>
      <Footer />
    </>
  );
}

// import React from "react";

// const page = () => {
//   return <div>slsllsslls</div>;
// };

// export default page;
