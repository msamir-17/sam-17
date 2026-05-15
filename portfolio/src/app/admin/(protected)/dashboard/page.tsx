"use client";

import React, { useState, useEffect } from "react";
import { HiViewGrid, HiCode, HiBriefcase, HiAcademicCap, HiSparkles } from 'react-icons/hi';
import api from '@/lib/axios';

interface DashboardStats {
  projects: number;
  internships: number;
  certificates: number;
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({ projects: 0, internships: 0, certificates: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, internshipsRes, certificatesRes] = await Promise.all([
          api.get('/projects'),
          api.get('/internships'),
          api.get('/certificates')
        ]);
        setStats({
          projects: projectsRes.data?.length || 0,
          internships: internshipsRes.data?.length || 0,
          certificates: certificatesRes.data?.length || 0,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: HiCode, color: 'from-blue-500 to-cyan-500' },
    { label: 'Internships', value: stats.internships, icon: HiBriefcase, color: 'from-purple-500 to-pink-500' },
    { label: 'Certificates', value: stats.certificates, icon: HiAcademicCap, color: 'from-emerald-500 to-green-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
          <HiViewGrid className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm">Welcome back! Here&apos;s your portfolio overview.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/80 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-r ${card.color} rounded-xl shadow-lg`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <HiSparkles className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              {loading ? (
                <div className="h-8 w-16 bg-gray-700 rounded animate-pulse" />
              ) : (
                <p className="text-3xl font-bold text-white">{card.value}</p>
              )}
              <p className="text-sm text-gray-400 mt-1 font-medium">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="/admin/projects" className="flex items-center gap-3 p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl transition-colors">
            <HiCode className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300 font-medium text-sm">Manage Projects</span>
          </a>
          <a href="/admin/internship" className="flex items-center gap-3 p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl transition-colors">
            <HiBriefcase className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300 font-medium text-sm">Manage Internships</span>
          </a>
          <a href="/admin/certificates" className="flex items-center gap-3 p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl transition-colors">
            <HiAcademicCap className="w-5 h-5 text-emerald-400" />
            <span className="text-gray-300 font-medium text-sm">Manage Certificates</span>
          </a>
          <a href="/admin/hero" className="flex items-center gap-3 p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl transition-colors">
            <HiSparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-300 font-medium text-sm">Edit Hero Section</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
