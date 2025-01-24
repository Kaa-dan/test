"use client";
import en from "../../locals/en.json";
import { MdPayment, MdAttachMoney, MdSupport, MdLocalShipping } from "react-icons/md";

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
      <div className="mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent =
              iconMapping[benefit.icon as keyof typeof iconMapping];

            return (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg"
              >
                <div className="w-12 h-12 flex items-center justify-center text-primary-black">
                  {IconComponent && <IconComponent size={48} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary-black">
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
