"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/contexts/CardContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    addToCart,
    clearCart,
    getSubtotal,
    getDiscount,
    getTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    error
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuantityChange = (item: any, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(item._id);
    } else {
      addToCart({ ...item, quantity: newQuantity - item.quantity });
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsSubmitting(true);
    try {
      await applyCoupon(couponCode);
      if (!error) {
        setCouponCode("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>
          Your cart is empty.{" "}
          <Link href="/" className="text-primary-orange hover:underline">
            Continue shopping
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center border-b py-4">
              <div className="w-24 h-24 relative flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                    className="bg-gray-200 px-2 py-1 rounded-l"
                  >
                    -
                  </button>
                  <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    className="bg-gray-200 px-2 py-1 rounded-r"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="ml-auto">
                <p className="text-lg font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="md:w-1/3">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            {/* Coupon Section */}
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-grow px-3 py-2 border rounded"
                  disabled={isSubmitting || !!appliedCoupon}
                />
                {appliedCoupon ? (
                  <button
                    onClick={removeCoupon}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={handleApplyCoupon}
                    disabled={isSubmitting || !couponCode.trim()}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 disabled:bg-gray-400"
                  >
                    Apply
                  </button>
                )}
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {appliedCoupon && (
                <p className="text-green-600 text-sm mt-2">
                  Coupon {appliedCoupon.code} applied! ({appliedCoupon.discountPercentage}% off)
                </p>
              )}
            </div>

            {/* Price Summary */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              {getDiscount() > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${getDiscount().toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-primary-orange text-white py-2 px-4 rounded-md mt-4 hover:bg-primary-orange/80 transition-colors">
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md mt-2 hover:bg-gray-300 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}