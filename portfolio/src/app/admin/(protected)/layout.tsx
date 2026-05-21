"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiMenu, HiX, HiViewGrid, HiCode, HiBriefcase, HiAcademicCap, HiSparkles, HiLogout, HiChartBar } from "react-icons/hi";

const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: HiViewGrid },
    { name: "Analytics", href: "/admin/analytics", icon: HiChartBar },
    { name: "Projects", href: "/admin/projects", icon: HiCode },
    { name: "Internships", href: "/admin/internship", icon: HiBriefcase },
    { name: "Certificates", href: "/admin/certificates", icon: HiAcademicCap },
    { name: "Hero Section", href: "/admin/hero", icon: HiSparkles },
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
        router.replace("/");
    };

    if (!isAuthorized) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-gray-400">Loading...</span>
                </div>
            </div>
        );
    }

    const SidebarContent = () => (
        <div className="flex flex-col justify-between h-full bg-gray-900 border-r border-gray-800 p-5">
            <div>
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-sm">S</span>
                        </div>
                        <h2 className="text-lg font-bold text-white">Admin</h2>
                    </div>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-white transition"
                    >
                        <HiX className="w-5 h-5" />
                    </button>
                </div>

                <nav className="space-y-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`}
                            >
                                <link.icon className="w-4 h-4 flex-shrink-0" />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-600/10 rounded-xl transition-colors"
            >
                <HiLogout className="w-4 h-4" />
                Logout
            </button>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-950 text-white">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-60 flex-shrink-0">
                <div className="fixed top-0 left-0 h-screen w-60">
                    <SidebarContent />
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
                <aside className="absolute top-0 left-0 h-full w-60">
                    <SidebarContent />
                </aside>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col w-full">
                {/* Mobile Header */}
                <header className="lg:hidden bg-gray-900/80 backdrop-blur-md px-4 py-3 flex justify-between items-center sticky top-0 z-30 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">S</span>
                        </div>
                        <h2 className="text-base font-semibold text-white">Admin</h2>
                    </div>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        {isMenuOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
                    </button>
                </header>

                <main className="flex-1 p-6 md:p-8 lg:p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}