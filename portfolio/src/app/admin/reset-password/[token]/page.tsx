// In portfolio/src/app/admin/reset-password/[token]/page.tsx

'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import Link from 'next/link';

const ResetPasswordPage = () => {
    const params = useParams();
    const router = useRouter();
    const token = params.token as string; // Get the token from the URL

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
        setLoading(true);
        setError('');
        setMessage('');

        try {
            // Call the backend's 'reset-password' endpoint
            await api.put(`/users/reset-password/${token}`, {
                password,
            });
            
            setMessage('Password has been reset successfully! You can now log in.');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to reset password. Token might be invalid or expired.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center">Reset Your Password</h1>
                
                {message ? (
                    <div className="text-center">
                        <p className="p-4 bg-green-900/50 border border-green-500 rounded-lg">{message}</p>
                        <Link href="/admin/login" className="mt-4 inline-block text-blue-400 hover:underline">
                            Go to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="password">New Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label htmlFor="passwordConfirm">Confirm New Password</label>
                            <input
                                id="passwordConfirm"
                                type="password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                        {error && <p className="text-sm text-center text-red-500">{error}</p>}
                        <button type="submit" disabled={loading} className="w-full px-4 py-2 font-semibold ...">
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;