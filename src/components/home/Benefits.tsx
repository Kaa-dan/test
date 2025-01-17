"use client";
import en from "../../locals/en.json";
import { MdPayment, MdAttachMoney, MdSupport } from "react-icons/md";

import { MdLocalShipping } from "react-icons/md";

const Benefits = () => {
  const iconMapping = {
    MdLocalShipping: MdLocalShipping,
    MdPayment: MdPayment,
    MdAttachMoney: MdAttachMoney,
    MdSupport: MdSupport,
  };

  const { benefits } = en;

  return (
    <div className="bg-primary-white py-16 w-full h-full">
      <div className="mx-auto px-6">
        <div className="flex flex-wrap justify-evenly gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent =
              iconMapping[benefit.icon as keyof typeof iconMapping];

            return (
              <div
                key={index}
                className="flex items-center space-x-4 border-r border-gray-300 pr-8 last:border-r-0"
              >
                <div className="w-12 h-12 flex items-center justify-center text-black">
                  {IconComponent && <IconComponent size={48} />}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-black">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-500">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
