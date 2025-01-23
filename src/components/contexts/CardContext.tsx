"use client";
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Coupon {
  code: string;
  discountPercentage: number;
  minimumPurchase?: number;
  maximumDiscount?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: () => void;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const AVAILABLE_COUPONS: Coupon[] = [
  { code: "WELCOME10", discountPercentage: 10 },
  { code: "SAVE20", discountPercentage: 20, minimumPurchase: 100 },
  {
    code: "SUPER30",
    discountPercentage: 30,
    minimumPurchase: 200,
    maximumDiscount: 100,
  },
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedCoupon = localStorage.getItem("appliedCoupon");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedCoupon) {
      setAppliedCoupon(JSON.parse(savedCoupon));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (appliedCoupon) {
      localStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem("appliedCoupon");
    }
  }, [cart, appliedCoupon]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    localStorage.removeItem("cart");
    localStorage.removeItem("appliedCoupon");
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getDiscount = () => {
    if (!appliedCoupon) return 0;

    const subtotal = getSubtotal();
    if (
      appliedCoupon.minimumPurchase &&
      subtotal < appliedCoupon.minimumPurchase
    ) {
      return 0;
    }

    const discount = (subtotal * appliedCoupon.discountPercentage) / 100;
    if (appliedCoupon.maximumDiscount) {
      return Math.min(discount, appliedCoupon.maximumDiscount);
    }
    return discount;
  };

  const getTotal = () => {
    return getSubtotal() - getDiscount();
  };

  const applyCoupon = async (code: string) => {
    setError(null);
    const coupon = AVAILABLE_COUPONS.find(
      (c) => c.code.toLowerCase() === code.toLowerCase()
    );

    if (!coupon) {
      setError("Invalid coupon code");
      return;
    }

    const subtotal = getSubtotal();
    if (coupon.minimumPurchase && subtotal < coupon.minimumPurchase) {
      setError(
        `Minimum purchase of $${coupon.minimumPurchase} required for this coupon`
      );
      return;
    }

    setAppliedCoupon(coupon);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setError(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getSubtotal,
        getDiscount,
        getTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
