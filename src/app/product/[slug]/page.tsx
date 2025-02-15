import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
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
  slug: string;
}

async function getProduct(slug: string): Promise<Product | undefined> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/get-by-slug/${slug}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return undefined;
  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await params correctly
  const { slug } = await params;
  console.log({ slug });
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <div className="w-full overflow-hidden">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-[500px]">
              <div className="colorful-loader"></div>
            </div>
          }
        >
          <ProductDetails product={product} />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
