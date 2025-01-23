"use client";
import { useState, useEffect } from "react";
import { useTestimonials } from "@/components/hooks/homepage-hooks";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Testimonial: React.FC = () => {
  const { data: testimonials, isLoading, error } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-100">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-100">
        <div className="text-gray-600">Error: {error.message}</div>
      </div>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-100">
        <div className="text-gray-600">No testimonials available.</div>
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visibleTestimonials = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visibleTestimonials.push(testimonials[index]);
    }
    return visibleTestimonials;
  };

  return (
    <div className="relative h-[600px] py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center relative">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 z-20 w-12 h-12 bg-primary-black rounded-full flex items-center justify-center text-white hover:bg-primary-orange"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Testimonials */}
          <div className="flex items-center justify-center gap-6 max-w-6xl mx-12">
            {getVisibleTestimonials().map((testimonial, index) => (
              <TestimonialItem
                key={`${testimonial.name}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-20 w-12 h-12 bg-primary-black rounded-full flex items-center justify-center text-white hover:bg-primary-orange"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-primary-black w-8" : "bg-primary-black"}`}
            />
          ))}
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
    <div className="w-[300px] h-[330px]">
      <div className="relative rounded-2xl overflow-hidden w-full h-full">
        {/* Content */}
        <div className="bg-primary-black p-6 text-primary-white w-full h-full">
          {/* Quote Open */}
          <div className="text-4xl font-serif text-primary-white leading-none mb-2">
            "
          </div>

          {/* Message */}
          <p className="text-primary-white text-center text-sm mb-4">
            {testimonial.message}
          </p>

          {/* Quote Close */}
          <div className="text-4xl font-serif text-primary-white leading-none text-right -mt-2">
            "
          </div>

          {/* Name and Role */}
          <div className="text-center mt-4">
            <h3 className="font-bold uppercase tracking-wider text-primary-orange text-sm">
              {testimonial.name}
            </h3>
            <p className="text-xs text-primary-white mt-1">
              {testimonial.role}
            </p>
          </div>

          {/* Stars */}
          <div className="flex justify-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < testimonial.stars ? "text-primary-orange fill-primary-orange" : "text-gray-400"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
