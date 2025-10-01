"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Project", href: "/admin/projects" },
    { name: "Internship", href: "/admin/internship" },
    { name: "Certificates", href: "/admin/certificates" },
    { name: "Hero Section", href: "/admin/hero" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            router.replace("/admin/login");
        } else {
            setIsAuthorized(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        router.replace("/admin/login");
    };

    if (!isAuthorized) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p>Loading...</p>
            </div>
        );
    }

    const SidebarContent = () => (
        <div className="flex flex-col justify-between h-full bg-gradient-to-b from-gray-800 to-gray-900 p-6 shadow-xl rounded-r-2xl">
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold tracking-wide text-white">Admin Panel</h2>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-red-400 transition"
                    >
                        <HiX className="w-6 h-6" />
                    </button>
                </div>

                <nav className="space-y-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${isActive
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <button
                onClick={handleLogout}
                className="mt-10 w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
                Logout
            </button>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-950 text-white">

            {/* --- DESKTOP SIDEBAR (No Change) --- */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
                <SidebarContent />
            </aside>

            {/* --- MOBILE SIDEBAR (No Change) --- */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
                <aside className="absolute top-0 left-0 h-full w-64">
                    <SidebarContent />
                </aside>
            </div>

            {/* --- MAIN CONTENT WRAPPER --- */}
            <div className="flex-1 flex flex-col w-full">

                {/* --- MOBILE HEADER & BUTTON --- */}
                <header className="lg:hidden bg-gray-800 backdrop-blur-md px-4 py-3 flex justify-between items-center sticky top-0 z-30 shadow-md">
                    <h2 className="text-xl font-semibold">Admin Panel</h2>

                    {/* Hamburger button ko header ke andar rakha, lekin `fixed` hata diya */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="z-50 p-2 text-white rounded-full hover:bg-gray-700 transition"
                    >
                        {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                    </button>
                </header>

                {/* Asli Content */}
                <main className="flex-1 p-6 md:p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}