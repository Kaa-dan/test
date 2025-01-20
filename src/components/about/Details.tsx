import React from "react";
import en from "../../locals/en.json";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { FaCartShopping } from "react-icons/fa6";
import Image from "next/image";

const iconMapping = {
  ThumbUpIcon: FaRegThumbsUp,
  TruckIcon: FaTruck,
  UserGroupIcon: HiUserGroup,
  ShoppingCartIcon: FaCartShopping,
};

const Details = () => {
  const { hero, features } = en;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-black mb-4">
          {hero.title}
        </h1>
        <p className="text-lg text-primary-black">{hero.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-xl overflow-hidden group">
          <Image
            src={hero.image}
            alt="Person enjoying music"
            className="w-full h-auto object-contain"
            width={800}
            height={800}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const IconComponent =
              iconMapping[feature.icon as keyof typeof iconMapping];

            return (
              <div
                key={feature.id}
                className="bg-gray-50 p-6 rounded-xl transition-transform duration-300 
                         hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="w-12 h-12 bg-primary-orange rounded-full flex items-center 
                              justify-center mb-4"
                >
                  <IconComponent className="w-6 h-6 text-primary-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-primary-black text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Details;
