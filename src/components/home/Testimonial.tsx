"use client";
import { useState, useEffect } from "react";
import { useTestimonials } from "@/components/hooks/homepage-hooks";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Testimonial: React.FC = () => {
  const { data: testimonials, isLoading, error } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
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
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visibleTestimonials = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visibleTestimonials.push(testimonials[index]);
    }
    return visibleTestimonials;
  };

  const testimonialVariants = {
    initial: { opacity: 0, x: 100 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <div className="relative min-h-[300px] md:h-[600px] py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center relative">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 z-20 w-8 h-8 md:w-12 md:h-12 bg-primary-black rounded-full flex items-center justify-center text-white hover:bg-primary-orange"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>

          {/* Testimonials */}
          <AnimatePresence>
            <div className="flex items-center justify-center gap-2 md:gap-6 w-full max-w-6xl">
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${index}`}
                  variants={testimonialVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full sm:w-1/2 md:w-1/3"
                >
                  <TestimonialItem testimonial={testimonial} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-20 w-8 h-8 md:w-12 md:h-12 bg-primary-black rounded-full flex items-center justify-center text-white hover:bg-primary-orange"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4 md:mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${index === currentIndex ? "bg-primary-black w-6 md:w-8" : "bg-primary-black/50"}`}
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
    <div className="w-full h-[250px] md:h-[330px] px-2">
      <div className="relative rounded-2xl overflow-hidden w-full h-full">
        {/* Content */}
        <div className="bg-primary-black p-4 md:p-6 text-primary-white w-full h-full">
          {/* Quote Open */}
          <div className="cursor-default text-3xl md:text-4xl font-serif text-primary-white leading-none mb-2">
            &quot;
          </div>

          {/* Message */}
          <p className="cursor-default text-primary-white text-center text-xs md:text-sm mb-2 md:mb-4">
            {testimonial.message}
          </p>

          {/* Quote Close */}
          <div className="cursor-default text-3xl md:text-4xl font-serif text-primary-white leading-none text-right -mt-2">
            &quot;
          </div>

          {/* Name and Role */}
          <div className="text-center mt-4">
            <h3 className="cursor-default font-bold uppercase tracking-wider text-primary-orange text-xs md:text-sm">
              {testimonial.name}
            </h3>
            <p className="cursor-default text-[10px] md:text-xs text-primary-white mt-1">
              {testimonial.role}
            </p>
          </div>

          {/* Stars */}
          <div className="cursor-default flex justify-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 md:w-4 md:h-4 ${i < testimonial.stars ? "text-primary-orange fill-primary-orange" : "text-gray-400"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
