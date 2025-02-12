"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
// import { useAuth } from '../auth/authContext';

export default function Login() {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('phone'); // 'phone' or 'otp'
    const router = useRouter()
    const [error, setError] = useState('');

    const handleRequestOTP = async (e: any) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-auth/sent-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone }),
            });

            const data = await response.json();
            console.log({ response })
            if (response.ok) {
                setStep('otp');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to send OTP. Please try again.');
        }
    };

    const handleVerifyOTP = async (e: any) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-auth/sign-in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, otp }),
            });

            const data = await response.json();

            if (!data.token) {
                window.alert('try again')
                setStep('phone')
            }
            if (data.token) {

                localStorage.setItem('token', data.token);
                console.log(data.user, 1)
                localStorage.setItem('user', JSON.stringify(data.user))
                router.push('/');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.log(error)
            setError('Failed to verify OTP. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                            {step === 'phone' ? 'Login with Phone' : 'Enter OTP'}
                        </h2>

                        {error && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}

                        {step === 'phone' ? (
                            <form onSubmit={handleRequestOTP}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Request OTP
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyOTP}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Enter OTP
                                    </label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter the OTP sent to your phone"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Verify OTP
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep('phone')}
                                    className="w-full mt-4 text-blue-500 hover:text-blue-600"
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