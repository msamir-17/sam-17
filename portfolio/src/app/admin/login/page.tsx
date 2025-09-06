"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const page = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Login ke baad redirect karne ke liye
    const router = useRouter();

    // Step 2: Form submit ko handle karne ke liye function
    const handleSubmit = async (e: React.FormEvent) => {
        // Form ka default refresh behaviour rokein
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Step 3: Backend ke login endpoint par POST request bhejein
            const response = await axios.post(
                "http://localhost:5000/api/users/login",
                {
                    username,
                    password,
                }
            );

            // Step 4: Agar login safal hota hai, toh token ko localStorage mein save karein

            if (response.data.token) {
                localStorage.setItem("authToken", response.data.token);
                // Login safal hone par dashboard par redirect karein

                router.push("./dashboard");
            }
        } catch (err: any) {
            // Step 5: Agar error aata hai, toh use state mein save karke user ko dikhayein
            setError(err.response?.data?.message || "login failed. Please try again");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center">Admin Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="text-sm font-medium text-gray-400"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-400"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {error && <p className="text-sm text-center text-red-500">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default page;
