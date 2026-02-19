
'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ForgotPasswordPage = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            // Backend ke 'forgot-password' endpoint ko call karein
            const response = await axios.post('http://localhost:5000/api/users/forgot-password', {
                username
            });
            
            setMessage(response.data.message); // "Token sent to email!"

        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
                <p className="text-center text-gray-400">
                    Enter your username, and we will send a password reset token to your registered email.
                </p>
                
                {/* Agar success message hai, toh form ki jagah message dikhayein */}
                {message ? (
                    <div className="text-center p-4 bg-green-900/50 border border-green-500 rounded-lg">
                        <p className="font-semibold">Check Your Email!</p>
                        <p className="text-sm">{message}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="text-sm font-medium text-gray-400">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="input-field" // Hum wahi purani class use kar rahe hain
                            />
                        </div>
                        {error && <p className="text-sm text-center text-red-500">{error}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {loading ? 'Sending...' : 'Send Reset Token'}
                        </button>
                    </form>
                )}

                <div className="text-center">
                    <Link href="/admin/login">
                        <span className="text-sm text-blue-400 hover:underline">Back to Login</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
