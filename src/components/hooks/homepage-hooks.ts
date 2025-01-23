import { useQuery } from "@tanstack/react-query";

export interface Banner {
  heading: string;
  subHeading: string;
  buttonTxt: string;
  image: string;
}

const fetchBanners = async (): Promise<Banner[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banner`);
  if (!response.ok) {
    throw new Error("Failed to fetch banners");
  }
  return response.json();
};

export const useBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: fetchBanners,
    staleTime: 1000 * 60 * 30,
  });
};

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  message: string;
  stars: number;
}

const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/testimonials`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch testimonials");
  }
  return response.json();
};

export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
    staleTime: 1000 * 60 * 30,
  });
};

export interface ApiError {
  message: string;
  status?: number;
}

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as ApiError).message === "string"
  );
};

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
};
