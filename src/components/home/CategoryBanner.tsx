import React from "react";

interface CategoryBannerProps {
  categoryName: string;
  description?: string;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({
  categoryName,
  description = "Explore our latest collection",
}) => {
  return (
    <div className="w-full py-24 bg-primary-black text-primary-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="space-y-4 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold tracking-tight leading-tight">
            {categoryName}
          </h1>
          <p className="text-xl text-primary-white max-w-2xl">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
