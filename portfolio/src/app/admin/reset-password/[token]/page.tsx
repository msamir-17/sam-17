'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import Link from 'next/link';
import { HiLockClosed, HiCheckCircle } from 'react-icons/hi';

const ResetPasswordPage = () => {
    const params = useParams();
    const router = useRouter();
    const token = params.token as string;

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        setLoading(true);
        setError('');
        setMessage('');

        try {
            await api.put(`/users/reset-password/${token}`, { password });
            setMessage('Password has been reset successfully!');
            // Auto-redirect after 3 seconds
            setTimeout(() => router.push('/admin/login'), 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to reset password. Token might be invalid or expired.');
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
                        <HiLockClosed className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">Reset Password</h1>
                    <p className="text-gray-400 text-sm mt-1">Enter your new password below</p>
                </div>

                {/* Form Card */}
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-8">
                    {message ? (
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto">
                                <HiCheckCircle className="w-8 h-8 text-green-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-green-400">{message}</p>
                                <p className="text-sm text-gray-400 mt-1">Redirecting to login...</p>
                            </div>
                            <Link href="/admin/login" className="inline-block text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                Go to Login Now
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="reset-password" className="text-sm font-medium text-gray-300 block mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        id="reset-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all text-sm"
                                        placeholder="Minimum 6 characters"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="reset-confirm" className="text-sm font-medium text-gray-300 block mb-2">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        id="reset-confirm"
                                        type="password"
                                        value={passwordConfirm}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        required
                                        minLength={6}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all text-sm"
                                        placeholder="Confirm your password"
                                    />
                                </div>
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
                                        Resetting...
                                    </span>
                                ) : (
                                    'Reset Password'
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;