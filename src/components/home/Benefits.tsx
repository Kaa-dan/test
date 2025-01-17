"use client";
import Image from "next/image";
import en from "../../locals/en.json";

const Benefits = () => {
  const { benefits } = en;

  return (
    <div className="bg-white py-10 w-full h-full">
      <div className="mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 border-r border-gray-300 pr-8 last:border-r-0"
            >
              {/* Icon */}
              <div className="w-12 h-12">
                <Image
                  src={benefit.icon}
                  alt={benefit.title}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-bold text-black">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-500">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
