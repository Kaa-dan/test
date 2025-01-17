"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import en from "../../locals/en.json";

const Testimonial = () => {
  const { testimonials } = en;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.reviews.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000); // Slide changes every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary-white py-16">
      <div className="mx-auto px-6 relative">
        {/* Title */}
        <h2 className="text-center text-3xl font-bold mb-12 text-primary-black">
          {testimonials.title}
        </h2>

        {/* Testimonial Wrapper */}
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.reviews.map((review, index) => (
              <div
                key={index}
                className="min-w-full flex flex-col items-center text-center px-4"
              >
                {/* Customer Image */}
                <div className="w-24 h-24 mb-4">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                </div>

                {/* Quote */}
                <p className="text-primary-black italic mb-4">"{review.quote}"</p>

                {/* Name and Role */}
                <h3 className="text-lg font-bold text-primary-black">{review.name}</h3>
                <p className="text-sm text-primary-black">{review.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700"
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700"
        >
          &#8250;
        </button>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.reviews.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-400"
              } cursor-pointer`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
