"use client";
import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import en from "../../locals/en.json";
import Image from "next/image";

const Faq = () => {
  const { faq } = en; // Extract FAQ data from en.json
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat py-12"
      style={{
        backgroundImage: `url(${faq.backgroundImage})`, 
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-11 items-start bg-opacity-90 p-6 rounded-lg shadow-lg">
          <div className="relative">
            <Image
              src={faq.image}
              alt="Customer Support"
              className="rounded-lg shadow-lg w-full object-contain"
              width={800}
              height={800}
            />
          </div>

          <div className="mt-14 space-y-6 r">
            <h2 className="text-4xl font-bold mb-4 text-primary-white">
              {faq.title}
            </h2>
            <p className="text-primary-white mb-8">{faq.description}</p>

            <div className="space-y-4">
              {faq.items.map((item, index) => (
                <div
                  key={index}
                  className="border border-primary-white rounded-lg overflow-hidden"
                >
                  <button
            suppressHydrationWarning={true}

                    className="w-full px-6 py-4 text-left flex justify-between items-center text-primary-white hover:bg-primary-black transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium">{item.question}</span>
                    {openIndex === index ? (
                      <BiChevronUp className="h-5 w-5 text-primary-white" />
                    ) : (
                      <BiChevronDown className="h-5 w-5 text-primary-white" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 py-4 bg-primary-white">
                      <p className="text-primary-black">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
