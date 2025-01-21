// app/category/[id]/page.tsx
"use client";
import React, { JSX, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import axios from "axios";

// Types
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  _id: string;
  name: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiError {
  message: string;
  status?: number;
}

interface PageState {
  category: Category | null;
  products: Product[];
  loading: boolean;
  error: string | null;
}

const ProductsByCategory = () => {
  const params = useParams();
  const categoryId = params.id as string;

  const [state, setState] = useState<PageState>({
    category: null,
    products: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Fetch category and its products in parallel
        const [categoryResponse, productsResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?category=${categoryId}`),
        ]);

        // Handle category response
        if (!categoryResponse.ok) {
          const errorData: ApiError = await categoryResponse.json();
          throw new Error(errorData.message || 'Failed to fetch category');
        }

        // Handle products response
        if (!productsResponse.ok) {
          const errorData: ApiError = await productsResponse.json();
          throw new Error(errorData.message || 'Failed to fetch products');
        }

        // Parse response data
        const categoryData: Category = await categoryResponse.json();
        const productsData: Product[] = await productsResponse.json();

        setState({
          category: categoryData,
          products: productsData,
          loading: false,
          error: null,
        });
      } catch (err) {
        const error = err as Error;
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message || 'An error occurred while fetching data',
        }));
        console.error('Error fetching category data:', error);
      }
    };

    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId]);

  const renderLoadingState = (): JSX.Element => (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-semibold text-gray-600"
      >
        Loading products...
      </motion.div>
    </div>
  );

  const renderErrorState = (): JSX.Element => (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-semibold text-red-500"
      >
        Error: {state.error}
      </motion.div>
    </div>
  );

  if (state.loading) return renderLoadingState();
  if (state.error) return renderErrorState();
  if (!state.category) return null;

  return (
    <div className="py-16 bg-[#fafafa]">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {state.category.name}
          </h1>
          <div className="relative w-full h-[200px] mb-8">
            <Image
              src={state.category.photo}
              alt={state.category.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Products Grid */}
        {state.products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 text-xl"
          >
            No products found in this category
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {state.products.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative h-[200px] mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsByCategory;