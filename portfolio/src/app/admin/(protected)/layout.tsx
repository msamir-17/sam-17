"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Project", href: "/admin/projects" },
    { name: "Internship", href: "/admin/internship" },
    { name: "Certificates", href: "/admin/certificates" },
    { name: 'Hero Section', href: '/admin/hero' }
];

export default function layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    // Yeh current URL path batata hai
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Step 1: Check karo ki localStorage mein token hai ya nahi
        const token = localStorage.getItem("authToken");

        if (!token) {
            // Step 2: Agar token nahi hai, toh user ko login page par bhej do
            router.replace("/admin/login");
        } else {
            // Step 3: Agar token hai, toh content (children) ko dikhne ki permission de do
            setIsAuthorized(true);
        }
    }, [router]); // useEffect ko router par depend karein

    const handleLogout = () => {
        // Token ko localStorage se hata do
        localStorage.removeItem("authToken");

        // Login page par bhej do
        router.replace("/admin/login");
    };

    // Jab tak authorization check ho raha hai, tab tak kuch na dikhayein ya loading dikhayein
    if (!isAuthorized) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p>Loading...</p>
            </div>
        );
    }

    // Agar authorized hai, toh page ka content (children) dikhayein

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {/* sidebar */}
            <aside className="w-64 flex-shrink-0 bg-gray-800 p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
                    <nav className="space-y-2">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`block px-4 py-2 rounded-md text-lg transition-colors ${isActive
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-400 hover:bg-gray-700 hover:text-white"
                                        } `}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 mt-8 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500"
                >
                    Logout
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-10">
                {children}
            </main>
        </div>
    );
}
