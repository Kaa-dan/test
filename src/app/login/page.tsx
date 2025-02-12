"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockIcon, PhoneIcon, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const router = useRouter();
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false);

  const handleRequestOTP = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-auth/sent-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setStep("otp");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-auth/sign-in`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, otp }),
        }
      );
      const data = await response.json();
      if (!data.token) {
        window.alert("try again");
        setStep("phone");
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#100C08] to-[#1a1a1a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="rounded-full bg-[#100C08] w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <LockIcon className="w-8 h-8 text-[#ff7542]" />
            </div>
            <h1 className="text-3xl font-bold text-[#100C08]">Welcome</h1>
            <p className="text-gray-500">
              {step === "phone"
                ? "Sign in to your account"
                : "Enter verification code"}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm">
              {error}
            </div>
          )}

          {step === "phone" ? (
            <form onSubmit={handleRequestOTP} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7542] focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ff7542] text-white py-3 rounded-xl hover:bg-[#ff7542]/90 transition-colors font-medium"
              >
                Continue
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Verification Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showOTP ? "text" : "password"}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="block w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7542] focus:border-transparent transition-all"
                    placeholder="Enter verification code"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOTP(!showOTP)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showOTP ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  className="w-full bg-[#ff7542] text-white py-3 rounded-xl hover:bg-[#ff7542]/90 transition-colors font-medium"
                >
                  Verify
                </button>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="w-full text-[#ff7542] hover:text-[#ff7542]/80 text-sm font-medium"
                >
                  ← Back to phone entry
                </button>
              </div>
            </form>
          )}

          <div className="text-center text-sm text-gray-500">
            © 2025 ZapStore
          </div>
        </div>
      </div>
    </div>
  );
}
