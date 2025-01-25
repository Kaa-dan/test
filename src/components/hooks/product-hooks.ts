import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Product {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
  discountPrice: number;
  images: string[];
  isActive: boolean;
  isAvailable: boolean;
  category: string;
  createdAt?: string;
  updatedAt?: string;
  slug: string;
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

const fetchProductBySlug = async (slug: string): Promise<Product> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/get-by-slug/${slug}`
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

const fetchAvailableProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const products = await response.json();
  return products.filter((product: Product) => product.isAvailable);
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

const fetchProductsByCategorySlug = async (
  slug: string
): Promise<Product[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${slug}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }
  return response.json();
};

export const useHotDeals = () => {
  return useQuery({
    queryKey: ["products", "hot-deals"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products = await response.json();
      return products
        .filter(
          (product: Product) =>
            product.isActive && // Must be active
            product.isAvailable && // Must be available
            product.discountPrice > 0 // Must have a discount
        )
        .slice(0, 4)
        .map((product: Product) => ({
          ...product,
          originalPrice: product.basePrice,
          discountAmount: product.basePrice - product.discountPrice,
        }));
    },
    staleTime: 1000 * 60 * 30,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const products = await fetchAvailableProducts();
      return products.filter((product) => product.isAvailable);
    },
    staleTime: 1000 * 6 * 3,
  });
};

// Hooks
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    staleTime: 1000 * 6 * 3,
  });
};

export const useProductSlug = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 6 * 3,
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 6 * 3,
  });
};

export const useActiveProducts = () => {
  return useQuery({
    queryKey: ["products", "active"],
    queryFn: fetchActiveProducts,
    staleTime: 1000 * 6 * 3,
  });
};

export const useProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["products", "category", categoryId],
    queryFn: () => fetchProductsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 6 * 3,
  });
};

export const useProductsByCategorySlug = (slug: string) => {
  return useQuery({
    queryKey: ["products", "category", slug],
    queryFn: () => fetchProductsByCategorySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 6 * 3,
  });
};

export interface Category {
  _id: string;
  name: string;
  description?: string;
  slug: string;
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

const fetchCategoryBySlug = async (slug: string): Promise<Category> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/get-by-slug/${slug}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch category by slug");
  }
  return response.json();
};

//Hooks
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 6 * 3,
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchCategory(id),
    enabled: !!id,
    staleTime: 1000 * 6 * 3,
  });
};

export const useSlugCategory = (slug: string) => {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => fetchCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 6 * 3,
  });
};

export interface Review {
  _id: string;
  product: string;
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
    staleTime: 1000 * 6 * 3,
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

export interface Coupon {
  _id: string;
  name: string;
  percentage: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const fetchCoupon = async (): Promise<Coupon[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupon`);
  if (!response.ok) {
    throw new Error("Failed to fetch coupon");
  }
  return response.json();
};

const fetchCouponById = async (id: string): Promise<Coupon> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/coupon/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch coupon");
  }
  return response.json();
};

// Fetch all coupons
export const useCoupons = () => {
  return useQuery({
    queryKey: ["coupons"],
    queryFn: fetchCoupon,
    staleTime: 1000 * 6 * 3,
  });
};

// Fetch a single coupon by ID
export const useCoupon = (id: string) => {
  return useQuery({
    queryKey: ["coupon", id],
    queryFn: () => fetchCouponById(id),
    enabled: !!id, // Ensures query is only run if ID is provided
    staleTime: 1000 * 6 * 3,
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
