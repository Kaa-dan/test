"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/contexts/CardContext";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import { toast } from "react-toastify";

const INDIAN_STATES = [
  { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chandigarh", label: "Chandigarh" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Dadra and Nagar Haveli", label: "Dadra and Nagar Haveli" },
  { value: "Daman and Diu", label: "Daman and Diu" },
  { value: "Delhi", label: "Delhi" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Ladakh", label: "Ladakh" },
  { value: "Lakshadweep", label: "Lakshadweep" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Puducherry", label: "Puducherry" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" }
];
interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string | undefined;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

interface AddressDetails {
  billing_customer_name: string;
  billing_address: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
}

interface OrderDetails extends AddressDetails {
  order_id: string;
  billing_address_2: string;
  billing_alternate_phone: string;
  billing_isd_code: string;
  shipping_is_billing: boolean;
  shipping_customer_name: string;
  shipping_last_name: string;
  shipping_address: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_pincode: string;
  shipping_state: string;
  shipping_country: string;
  shipping_email: string;
  shipping_phone: string;
  sub_total: number;
  user: any;
  order_items: Array<{
    name: string;
    sku: string;
    units: number;
    selling_price: string;
    discount: string;
    tax: string;
    hsn: string;
    brand: string;
    product: string;
    weight: number;
  }>;
  payment_method: string;
  length: number;
  breadth: number;
  height: number;
  weight: number;
  shipping_charges: number;
  giftwrap_charges: number;
  transaction_charges: number;
  total_discount: number;
}

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
    error,
  } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressErrors, setAddressErrors] = useState<Partial<AddressDetails>>({});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')!))
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [addressDetails, setAddressDetails] = useState<AddressDetails>({
    billing_customer_name: "",
    billing_address: "",
    billing_city: "",
    billing_pincode: "",
    billing_state: "",
    billing_country: "India",
    billing_email: "",
    billing_phone: user?.phone || "",
  });


  //validator for address
  const validateAddress = (): boolean => {
    const errors: Partial<AddressDetails> = {};
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pincodeRegex = /^[0-9]{6}$/;

    if (!addressDetails.billing_customer_name.trim()) {
      errors.billing_customer_name = "Name is required";
    }
    if (!addressDetails.billing_address.trim()) {
      errors.billing_address = "Address is required";
    }
    if (!addressDetails.billing_city.trim()) {
      errors.billing_city = "City is required";
    }
    if (!pincodeRegex.test(addressDetails.billing_pincode)) {
      errors.billing_pincode = "Enter valid 6-digit pincode";
    }
    if (!addressDetails.billing_state.trim()) {
      errors.billing_state = "State is required";
    }
    if (!emailRegex.test(addressDetails.billing_email)) {
      errors.billing_email = "Enter valid email address";
    }
    if (!phoneRegex.test(addressDetails.billing_phone)) {
      errors.billing_phone = "Enter valid 10-digit phone number";
    }

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };



  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(item._id);
    } else {
      addToCart({ ...item, quantity: newQuantity - item.quantity });
    }
  };
  //coupon handler
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

  //for shiprocket order id 
  const generateOrderId = () => {
    return 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
  };

  //handler for loading razorpay sdk
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  //handling order creation
  const createOrderDetails = (): OrderDetails => {
    return {
      order_id: generateOrderId(),
      ...addressDetails,
      billing_address_2: "",  // Add this
      billing_alternate_phone: "",  // Add this
      billing_isd_code: "+91",  // Add this
      shipping_is_billing: true,  // Add this
      shipping_customer_name: addressDetails.billing_customer_name,  // Add shipping details
      shipping_last_name: "",
      shipping_address: addressDetails.billing_address,
      shipping_address_2: "",
      shipping_city: addressDetails.billing_city,
      shipping_pincode: addressDetails.billing_pincode,
      shipping_state: addressDetails.billing_state,
      shipping_country: "India",
      shipping_email: addressDetails.billing_email,
      shipping_phone: addressDetails.billing_phone,
      user: user.id,
      sub_total: getTotal(),
      order_items: cart.map(item => ({
        name: item.name,
        sku: item.name,
        units: item.quantity,
        product: item._id,
        selling_price: item.price.toString(),
        discount: "0",
        tax: "0",
        hsn: "",
        brand: "",
        weight: 0.5
      })),
      payment_method: "Prepaid",
      length: 10,
      breadth: 10,
      height: 10,
      weight: 1,
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0
    };
  };



  //payment handler
  const handlePayment = async () => {
    if (!validateAddress()) {
      setShowAddressForm(true);
      return;
    }

    try {
      setIsProcessing(true);
      setPaymentError("");

      // 1. Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Razorpay SDK failed to load");
      }

      // 2. Create order details
      const orderDetails = createOrderDetails();
      console.log({ orderDetails })
      // 3. Create payment intent
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: getTotal(),
          currency: 'INR',
          orderDetails
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create order');
      }

      // 4. Initialize Razorpay options
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Your Store Name",
        description: "Purchase Payment",
        order_id: data.orderId,
        handler: async function (response: RazorpayResponse) {
          try {
            const verificationResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/verify-payment-create-order`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }),
            });

            const verificationData = await verificationResponse.json();
            toast.success('order created succesfully')
            if (verificationData.success) {
              clearCart();
              window.location.href = '/orders';
            } else {
              throw new Error(verificationData.error || 'Payment verification failed');
            }
          } catch (error) {
            setPaymentError('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: addressDetails.billing_customer_name,
          email: addressDetails.billing_email,
          contact: addressDetails.billing_phone
        },
        theme: {
          color: "#F97316"
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };

      // 5. Create Razorpay instance and open payment modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error: any) {
      setPaymentError(error.message || 'Payment initialization failed');
      setIsProcessing(false);
    }
  };

  //address handler
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddressDetails(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (addressErrors[name as keyof AddressDetails]) {
      setAddressErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  if (cart.length === 0) {
    return (
      <><Navbar />
        <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold mb-4 text-primary-black">
            Your Cart is Empty
          </h1>
          <p className="text-primary-black mb-8">
            It looks like you haven&#39;t added anything to your cart yet. Start
            shopping to fill it up!
          </p>
          <Link
            href="/"
            className="bg-primary-orange text-primary-white px-6 py-3 rounded-md hover:bg-primary-orange/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>  <Navbar />

      <div className="p-4 md:p-8 lg:p-11">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {paymentError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {paymentError}
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3 space-y-6">
            {/* Cart Items */}
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-center border-b py-4 gap-4"
                >
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0 gap-2">
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
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-lg font-semibold mt-2 md:mt-0">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Address Form */}
            {showAddressForm && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="billing_customer_name"
                      value={addressDetails.billing_customer_name}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter your full name"
                    />
                    {addressErrors.billing_customer_name && (
                      <p className="text-red-500 text-sm mt-1">{addressErrors.billing_customer_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      name="billing_email"
                      value={addressDetails.billing_email}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter your email"
                    />
                    {addressErrors.billing_email && (
                      <p className="text-red-500 text-sm mt-1">{addressErrors.billing_email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      name="billing_phone"
                      value={addressDetails.billing_phone}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="10-digit mobile number"
                    />
                    {addressErrors.billing_phone && (
                      <p className="text-red-500 text-sm mt-1">{addressErrors.billing_phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode*
                    </label>
                    <input
                      type="text"
                      name="billing_pincode"
                      value={addressDetails.billing_pincode}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="6-digit pincode"
                    />
                    {addressErrors.billing_pincode && (
                      <p className="text-red-500 text-sm mt-1">{addressErrors.billing_pincode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      name="billing_city"
                      value={addressDetails.billing_city}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter your city"
                    />
                    {addressErrors.billing_city && (
                      <p className="text-red-500 text-sm mt-1">{addressErrors.billing_city}</p>
                    )}
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State*
                    </label>
                    <input
                      type="text"
                      name="billing_state"
                      value={addressDetails.billing_state}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter your state"
                    />
                    {addressErrors.billing_state && (
                      <p className="text-red-500 text-sm mt-1">{addressErrors.billing_state}</p>
                    )}
                  </div> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State*
                    </label>
                    <select
                      name="billing_state"
                      value={addressDetails.billing_state}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                    {addressErrors.billing_state && (
                      <p className="text-red-500 text-sm mt-1">{addressErrors.billing_state}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <input
                    type="text"
                    name="billing_address"
                    value={addressDetails.billing_address}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter your complete address"
                  />
                  {addressErrors.billing_address && (
                    <p className="text-red-500 text-sm mt-1">{addressErrors.billing_address}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Coupon Section */}
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row gap-2">
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
              </div>

              {/* Price Summary */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{getSubtotal().toFixed(2)}</span>
                </div>
                {getDiscount() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{getDiscount().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {!showAddressForm ? (
                <button
                  onClick={() => {
                    console.log('clicked', token, user)
                    if (!token || !user.phone) {
                      toast.error('please login')
                    } else {

                      setShowAddressForm(true)
                    }

                  }
                  }
                  className="w-full bg-primary-orange text-white py-2 px-4 rounded-md mt-4 hover:bg-primary-orange/80 transition-colors"
                >
                  Proceed to Address
                </button>
              ) : (
                <button
                  onClick={handlePayment}
                  className="w-full bg-primary-orange text-white py-2 px-4 rounded-md mt-4 hover:bg-primary-orange/80 transition-colors"
                >
                  Proceed to Payment
                </button>
              )}

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
      <Footer /></>
  );
}