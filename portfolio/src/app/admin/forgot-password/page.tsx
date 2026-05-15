'use client';

import { useState } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';
import { HiMail, HiArrowLeft } from 'react-icons/hi';

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
            const response = await api.post('/users/forgot-password', { username });
            setMessage(response.data.message);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <HiMail className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">Forgot Password</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Enter your username and we&apos;ll send a reset link to your email.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-8">
                    {message ? (
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto">
                                <HiMail className="w-8 h-8 text-green-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-green-400">Check Your Email!</p>
                                <p className="text-sm text-gray-400 mt-1">{message}</p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="forgot-username" className="text-sm font-medium text-gray-300 block mb-2">
                                    Username
                                </label>
                                <input
                                    id="forgot-username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all text-sm"
                                    placeholder="Enter your username"
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-900/30 border border-red-800/50 rounded-xl">
                                    <p className="text-sm text-center text-red-400">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </span>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </button>
                        </form>
                    )}

                    <div className="text-center mt-5">
                        <Link href="/admin/login" className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            <HiArrowLeft className="w-4 h-4" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
