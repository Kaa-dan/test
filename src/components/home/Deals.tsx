import { FC } from "react";
import Image from "next/image";
import deals from "../../locals/en.json";

const Deals: FC = () => {
  return (
    <div className="mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        {deals.deals.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {deals.deals.items.map((item) => (
          <div
            key={item.id}
            className="bg-primary-white rounded-lg shadow-lg p-6 relative"
          >
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-primary-orange text-primary-white px-3 py-1 rounded-full text-sm">
                Sale!
              </span>
            </div>

            <div className="relative h-48 mb-4 z-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>

            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary-black line-through">
                ${item.originalPrice.toFixed(2)}
              </span>
              <span className="text-primary-orange font-bold">
                ${item.salePrice.toFixed(2)}
              </span>
            </div>

            <button 
             suppressHydrationWarning={true}
             className="w-full bg-primary-black text-primary-white py-2 rounded-md hover:bg-primary-black transition-colors">
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
