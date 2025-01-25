"use client";
import React from "react";
import Image from "next/image";
import { useLogos } from "@/components/hooks/homepage-hooks";

const LogoDisplay = () => {
  const { data: logos = [], isLoading, error } = useLogos();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-primary-black">
        <div className="colorful-loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-primary-black">
        <div className="text-primary-white">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
      {logos.map((logo) => (
        <div key={logo._id} className="flex justify-center">
          <Image
            src={logo.image}
            alt={logo.name}
            width={100}
            height={50}
            className="w-full max-w-[200px] h-auto"
          />
        </div>
      ))}
    </div>
  );
};

export default LogoDisplay;
