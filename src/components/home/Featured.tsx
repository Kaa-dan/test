"use client"
import React, { useState } from 'react';
import enData from '../../locals/en.json';

interface Product {
  id: number;
  name: string;
  regularPrice: number;
  salePrice: number;
  image: string;
  onSale: boolean;
  addToCartText: string;
}

interface FeaturedProductsData {
  title: string;
  products: Product[];
  saleLabel: string;
}

const Featured: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 3;
  
  const { featured_products: data } = enData as { featured_products: FeaturedProductsData };
  const { products } = data;

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">FEATURED PRODUCT</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Products Column */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <div key={product.id} className="relative bg-white">
              {product.onSale && (
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  Sale!
                </div>
              )}
              <img
                src={product.image || "/api/placeholder/200/200"}
                alt={product.name}
                className="w-full h-auto"
              />
              <div className="text-center p-4">
                <h3 className="text-sm mb-2">{product.name}</h3>
                <p className="text-sm mb-2">
                  {product.onSale && (
                    <span className="line-through text-gray-400 mr-2">
                      ${product.regularPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="font-bold">
                    ${product.salePrice.toFixed(2)}
                  </span>
                </p>
                <button className="text-xs uppercase border border-gray-300 px-4 py-2 hover:bg-gray-100 transition-colors">
                  {product.addToCartText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Best Deals Column */}
        <div className="bg-blue-600 text-white p-8 flex flex-col items-center justify-center">
          <h3 className="text-3xl font-bold text-center mb-4">
            BEST<br />PRODUCT<br />DEALS !
          </h3>
          <div className="w-16 h-1 bg-white mb-4"></div>
          <p className="text-center text-sm mb-6">
            Get a 20% Cashback when buying TWS Product From SoundPro Audio Technology.
          </p>
          <button className="border border-white px-6 py-2 text-sm hover:bg-white hover:text-blue-600 transition-colors">
            SHOP NOW
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 ${
              currentPage === i + 1
                ? 'bg-gray-800 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage)}
          className="w-8 h-8 text-gray-600 hover:bg-gray-100"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Featured;