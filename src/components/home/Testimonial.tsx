"use client";
import { useEffect, useRef } from "react";
import { useTestimonials } from "@/components/hooks/homepage-hooks";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Testimonial: React.FC = () => {
  const { data: testimonials, isLoading, error } = useTestimonials();
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          left: sliderRef.current.offsetWidth,
          behavior: "smooth",
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="colorful-loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px] md:h-[600px] bg-gray-100">
        <div className="text-gray-600">Error: {error.message}</div>
      </div>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px] md:h-[600px] bg-gray-100">
        <div className="text-gray-600">No testimonials available.</div>
      </div>
    );
  }

  const handlePrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-[300px] md:h-[600px] py-8 md:py-16 overflow-hidden">
      <div className="mx-auto px-8">
        <div className="flex items-center justify-center relative">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 z-20 w-8 h-8 md:w-12 md:h-12 bg-primary-black rounded-full flex items-center justify-center text-white hover:bg-primary-orange"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>

          {/* Testimonials Carousel */}
          <div
            ref={sliderRef}
            className="flex items-center gap-2 md:gap-6 w-full max-w-6xl overflow-x-auto no-scrollbar scroll-smooth"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0"
              >
                <TestimonialItem testimonial={testimonial} />
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-20 w-8 h-8 md:w-12 md:h-12 bg-primary-black rounded-full flex items-center justify-center text-white hover:bg-primary-orange"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface TestimonialItemProps {
  testimonial: {
    name: string;
    role: string;
    message: string;
    stars: number;
  };
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({ testimonial }) => {
  return (
    <div className="w-full h-[250px] md:h-[330px] px-2">
      <div className="relative rounded-2xl overflow-hidden w-full h-full">
        <div className="bg-primary-black p-4 md:p-6 text-primary-white w-full h-full flex flex-col items-center justify-center">
          <p className="cursor-default text-primary-white text-center text-xs md:text-sm mb-2 md:mb-4">
            {testimonial.message}
          </p>
          <div className="text-center mt-4">
            <h3 className="cursor-default font-bold uppercase tracking-wider text-primary-orange text-xs md:text-sm">
              {testimonial.name}
            </h3>
            <p className="cursor-default text-[10px] md:text-xs text-primary-white mt-1">
              {testimonial.role}
            </p>
          </div>
          <div className="cursor-default flex justify-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 md:w-4 md:h-4 ${
                  i < testimonial.stars
                    ? "text-primary-orange fill-primary-orange"
                    : "text-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
