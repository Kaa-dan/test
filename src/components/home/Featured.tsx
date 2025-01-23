"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useFeaturedProducts } from '@/components/hooks/product-hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/components/contexts/CardContext';

const Featured = () => {
  const { data: products, isLoading, error } = useFeaturedProducts();
  const { addToCart } = useCart();
  const router = useRouter();

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="w-full mx-auto py-12">
      <h2 className="text-4xl font-bold text-center mb-12">FEATURED PRODUCT</h2>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-2 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {products?.map((product) => (
            <motion.div
              onClick={() => handleProductClick(product._id)}
              key={product._id}
              variants={item}
              className="group relative cursor-pointer"
            >
              <motion.div
                whileHover="hover"
                variants={imageVariants}
                className="relative h-64 mb-4 bg-gray-100 rounded-lg overflow-hidden"
              >
                <Image
                  src={product.images[0] || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </motion.div>

              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-500 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
                <span className="text-xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the product click
                  addToCart({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.images[0],
                  });
                }}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors inline-block text-center"
              >
                ADD TO CART
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-primary-black rounded-lg p-8 text-white flex flex-col items-center justify-center text-center h-full"
        >
          <h3 className="text-4xl font-bold mb-4">BEST PRODUCT DEALS!</h3>
          <p className="mb-8">
            Get a 20% Cashback when buying TWS Product From SoundPro Audio
            Technology.
          </p>
          <Link
            href="/shop"
            className="border-2 border-white text-white py-2 px-6 rounded-md hover:bg-white hover:text-blue-600 transition-colors inline-block"
          >
            SHOP NOW
          </Link>
        </motion.div>
      </div>

      <div className="flex justify-center gap-2 mt-12">
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className="w-10 h-10 border border-gray-200 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            {page}
          </button>
        ))}
        <button className="w-10 h-10 border border-gray-200 rounded-md hover:bg-blue-600 hover:text-white transition-colors">
          →
        </button>
      </div>
    </section>
  );
};

export default Featured;