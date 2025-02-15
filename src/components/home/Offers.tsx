"use client";
import React from "react";
import Image from "next/image";
import en from "../../locals/en.json";

const Offers = () => {
  const { offers } = en;

  return (
    <div className="w-full h-full bg-primary-white">
      <div className="flex flex-wrap items-center justify-center gap-7 py-3 px-4">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg flex justify-between items-start w-[500px] shadow-md"
          >
            <div className="flex flex-col items-start">
              <h4 className="cursor-default text-sm font-medium text-primary-orange">
                {offer.title}
              </h4>
              <h2 className="cursor-default text-2xl font-bold text-primary-black my-3">
                {offer.description}
              </h2>
              <button
                suppressHydrationWarning={true}
                className="text-sm text-gray-600 font-semibold underline mb-4 hover:text-primary-orange"
                onClick={() => {
                  const section = document.getElementById(offer.ctaTargetId); // Use the ctaTargetId field
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {offer.cta}
              </button>
            </div>
            <div className="mt-auto self-center">
              <Image
                src={offer.image}
                alt={offer.title}
                width={250}
                height={250}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
