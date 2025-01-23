import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  isActive: boolean;
  category: string;
  stock?: number;
  specifications?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

//Products
const fetchProduct = async (id: string): Promise<Product> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
};

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

const fetchActiveProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const products = await response.json();
  return products.filter((product: Product) => product.isActive);
};

const fetchProductsByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${categoryId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }
  return response.json();
};

// Search Products
const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/search?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to search products");
  }
  return response.json();
};

export const useHotDeals = () => {
  return useQuery({
    queryKey: ["products", "hot-deals"],
    queryFn: async () => {
      const products = await fetchActiveProducts();
      return products.slice(0, 4).map((product) => ({
        ...product,
        originalPrice: product.price * 1.2, // 20% higher for "original" price
      }));
    },
    staleTime: 1000 * 60 * 30,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const products = await fetchActiveProducts();
      // Get 6 products for featured section
      return products.slice(0, 6);
    },
    staleTime: 1000 * 60 * 30,
  });
};

// Related Products Hook
export const useRelatedProducts = (productId: string, categoryId: string) => {
  return useQuery({
    queryKey: ["products", "related", productId],
    queryFn: async () => {
      const products = await fetchProductsByCategory(categoryId);
      return products
        .filter((product) => product._id !== productId)
        .slice(0, 4);
    },
    enabled: !!productId && !!categoryId,
    staleTime: 1000 * 60 * 30,
  });
};

// Hooks
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 30,
  });
};

export const useActiveProducts = () => {
  return useQuery({
    queryKey: ["products", "active"],
    queryFn: fetchActiveProducts,
    staleTime: 1000 * 60 * 30,
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ["products", "search", query],
    queryFn: () => searchProducts(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 30,
  });
};

export const useProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["products", "category", categoryId],
    queryFn: () => fetchProductsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 30,
  });
};

export interface Category {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

//Catgory
const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

const fetchCategory = async (id: string): Promise<Category> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }
  return response.json();
};

//Hooks
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 30,
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchCategory(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
  });
};

export interface Review {
  _id: string;
  product: string; // ObjectId of the product
  message: string;
  approved: boolean;
  stars: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

const fetchReviewsByProductId = async (
  productId: string
): Promise<Review[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/product/${productId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product reviews");
  }
  return response.json();
};

const createReview = async (
  reviewData: Omit<Review, "_id">
): Promise<Review> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create review");
  }
  return response.json();
};

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => fetchReviewsByProductId(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 30,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: (newReview) => {
      // Invalidate and refetch reviews for the specific product
      queryClient.invalidateQueries({
        queryKey: ["reviews", newReview.product],
      });
    },
  });
};

// Error type for better error handling
export interface ApiError {
  message: string;
  status?: number;
}

// Helper function to check if something is an ApiError
export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as ApiError).message === "string"
  );
};

// Helper function to format error messages
export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
};
