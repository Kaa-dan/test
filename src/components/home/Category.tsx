"use client";
import React from "react";
import Image from "next/image";
import en from "../../locals/en.json";

const Category = () => {
  const { categories } = en;

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-white ${
                index === 0
                  ? "sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2"
                  : ""
              }`}
            >
              {/* Card Content */}
              <div className="h-full transition-transform duration-500 ease-out hover:scale-105">
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes={index === 0 ? "50vw" : "25vw"}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.title}
                  </h3>

                  <a
                    href={category.link}
                    className="inline-flex items-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Explore Collection
                    <svg
                      className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
