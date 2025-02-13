"use client"
import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent, ClipboardEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

interface OTPInputProps {
    otp: string[];
    setOtp: (otp: string[]) => void;
    isLoading: boolean;
}

interface APIResponse {
    token?: string;
    user?: UserData;
    message?: string;
}

interface UserData {
    id: string;
    phone: string;
    [key: string]: any; // For any additional user fields
}

const OTPInput: React.FC<OTPInputProps> = ({ otp, setOtp, isLoading }) => {
    const [activeInput, setActiveInput] = useState<number>(0);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs[index + 1].current?.focus();
            setActiveInput(index + 1);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
            setActiveInput(index - 1);
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').substring(0, 4);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split('').forEach((digit, index) => {
            if (index < 4) newOtp[index] = digit;
        });
        setOtp(newOtp);
    };

    return (
        <div className="flex gap-4 justify-center mb-6">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    disabled={isLoading}
                    className="w-12 h-12 text-center text-2xl border-2 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition-all bg-white disabled:bg-gray-100"
                />
            ))}
        </div>
    );
};

interface LoginState {
    phone: string;
    otp: string[];
    step: 'phone' | 'otp';
    isLoading: boolean;
    error: string;
}

export default function Login(): any {
    const [state, setState] = useState<LoginState>({
        phone: "",
        otp: ["", "", "", ""],
        step: "phone",
        isLoading: false,
        error: ""
    });
    const router = useRouter();

    const setOtp = (newOtp: string[]): void => {
        setState(prev => ({ ...prev, otp: newOtp }));
    };

    const handleRequestOTP = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setState(prev => ({ ...prev, isLoading: true, error: "" }));

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user-auth/sent-otp`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phone: state.phone }),
                }
            );
            const data: APIResponse = await response.json();

            if (response.ok) {
                setState(prev => ({ ...prev, step: "otp" }));
            } else {
                setState(prev => ({ ...prev, error: data.message || "Failed to send OTP" }));
            }
        } catch (error) {
            setState(prev => ({ ...prev, error: "Failed to send OTP. Please try again." }));
        } finally {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (state.otp.some(digit => !digit)) {
            setState(prev => ({ ...prev, error: "Please enter complete OTP" }));
            return;
        }

        setState(prev => ({ ...prev, isLoading: true, error: "" }));

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user-auth/sign-in`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        phone: state.phone,
                        otp: state.otp.join("")
                    }),
                }
            );
            const data: APIResponse = await response.json();

            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                router.push("/");
            } else {
                setState(prev => ({
                    ...prev,
                    error: data.message || "Invalid OTP",
                    otp: ["", "", "", ""]
                }));
            }
        } catch (error) {
            setState(prev => ({ ...prev, error: "Failed to verify OTP. Please try again." }));
        } finally {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const resetToPhone = (): void => {
        setState(prev => ({
            ...prev,
            step: 'phone',
            otp: ["", "", "", ""],
            error: "",
            isLoading: false
        }));
    };

    return (
        <>
            <Navbar />
            <div className="h-[50vh] bg-black flex items-center justify-center px-4">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-lg shadow-xl p-8">
                        <h2 className="text-3xl font-bold text-black text-center mb-8">
                            {state.step === 'phone' ? 'Login with Phone' : 'Enter OTP'}
                        </h2>

                        {state.error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-center">
                                {state.error}
                            </div>
                        )}

                        {state.step === 'phone' ? (
                            <form onSubmit={handleRequestOTP}>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={state.phone}
                                        onChange={(e) => setState(prev => ({ ...prev, phone: e.target.value }))}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                        placeholder="Enter your phone number"
                                        disabled={state.isLoading}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={state.isLoading || !state.phone}
                                    className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
                                >
                                    {state.isLoading ? "Sending..." : "Request OTP"}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyOTP}>
                                <OTPInput
                                    otp={state.otp}
                                    setOtp={setOtp}
                                    isLoading={state.isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={state.isLoading || state.otp.some(digit => !digit)}
                                    className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed mb-4"
                                >
                                    {state.isLoading ? "Verifying..." : "Verify OTP"}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetToPhone}
                                    disabled={state.isLoading}
                                    className="w-full text-orange-500 hover:text-orange-600 disabled:text-orange-300 disabled:cursor-not-allowed"
                                >
                                    Back to Phone Entry
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Footer /></>
    );
}