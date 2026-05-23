"use client";

import React, { useState, useEffect } from "react";
import { HiChartBar, HiUsers, HiEye, HiDownload, HiCursorClick, HiGlobe, HiDeviceMobile, HiDesktopComputer, HiRefresh, HiClock, HiExternalLink, HiCode } from "react-icons/hi";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import api from "@/lib/axios";

interface Stats {
  total: { pageViews: number; uniqueVisitors: number; returningVisitors: number };
  today: { pageViews: number; uniqueVisitors: number };
  week: { pageViews: number; uniqueVisitors: number };
  month: { pageViews: number; uniqueVisitors: number };
  resumeDownloads: number;
  projectClicks: number;
}

interface TrendItem { date: string; views: number; visitors: number }
interface ProjectStat { _id: string; clicks: number; lastClicked: string }
interface BreakdownItem { _id: string; count: number }
interface ActivityItem { _id: string; type: string; page: string; projectTitle?: string; device: string; browser: string; os: string; country: string; city: string; createdAt: string }
interface ResumeData { totalDownloads: number; downloads: { device: string; browser: string; os: string; country: string; city: string; createdAt: string }[] }

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

const AnalyticsPage = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [trend, setTrend] = useState<TrendItem[]>([]);
  const [projectStats, setProjectStats] = useState<ProjectStat[]>([]);
  const [devices, setDevices] = useState<{ devices: BreakdownItem[]; browsers: BreakdownItem[]; operatingSystems: BreakdownItem[]; countries: BreakdownItem[] }>({ devices: [], browsers: [], operatingSystems: [], countries: [] });
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "resume" | "activity">("overview");

  const fetchAll = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [s, t, p, d, a, r] = await Promise.all([
        api.get("/analytics/stats", { headers }),
        api.get("/analytics/trend", { headers }),
        api.get("/analytics/projects", { headers }),
        api.get("/analytics/devices", { headers }),
        api.get("/analytics/activity?limit=25", { headers }),
        api.get("/analytics/resume", { headers }),
      ]);
      setStats(s.data); setTrend(t.data); setProjectStats(p.data); setDevices(d.data); setActivity(a.data); setResumeData(r.data);
    } catch (err) { console.error("Failed to fetch analytics:", err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const formatDate = (d: string | number | Date) => {
    if (!d) return "";

    const date = new Date(d);

    if (isNaN(date.getTime())) {
        return String(d);
    }

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
};

  const timeAgo = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const eventIcon = (type: string) => {
    if (type === "project_click") return <HiCursorClick className="w-4 h-4 text-purple-400" />;
    if (type === "live_link_click") return <HiExternalLink className="w-4 h-4 text-sky-400" />;
    if (type === "github_click") return <HiCode className="w-4 h-4 text-amber-400" />;
    if (type === "resume_download") return <HiDownload className="w-4 h-4 text-emerald-400" />;
    return <HiEye className="w-4 h-4 text-blue-400" />;
  };

  const eventLabel = (item: ActivityItem) => {
    if (item.type === "project_click") return `Viewed details for "${item.projectTitle}"`;
    if (item.type === "live_link_click") return `Opened live link for "${item.projectTitle}"`;
    if (item.type === "github_click") return `Opened GitHub link for "${item.projectTitle}"`;
    if (item.type === "resume_download") return "Downloaded resume";
    return `Visited ${item.page}`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"><HiChartBar className="w-6 h-6 text-white" /></div>
          <div><h1 className="text-2xl md:text-3xl font-bold text-white">Analytics</h1><p className="text-gray-400 text-sm">Loading analytics data...</p></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5 h-28 animate-pulse" />)}
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl h-72 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"><HiChartBar className="w-6 h-6 text-white" /></div>
          <div><h1 className="text-2xl md:text-3xl font-bold text-white">Analytics</h1><p className="text-gray-400 text-sm">Track your portfolio performance</p></div>
        </div>
        <button onClick={fetchAll} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-sm text-gray-300 transition-colors">
          <HiRefresh className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Stat Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Visitors", value: stats.total.uniqueVisitors, sub: `${stats.total.pageViews} page views`, icon: HiUsers, color: "from-blue-500 to-cyan-500" },
            { label: "Today", value: stats.today.uniqueVisitors, sub: `${stats.today.pageViews} views today`, icon: HiEye, color: "from-purple-500 to-pink-500" },
            { label: "Resume Downloads", value: stats.resumeDownloads, sub: "all time", icon: HiDownload, color: "from-emerald-500 to-green-500" },
            { label: "Project Clicks", value: stats.projectClicks, sub: `${stats.total.returningVisitors} returning`, icon: HiCursorClick, color: "from-orange-500 to-amber-500" },
          ].map((card) => (
            <div key={card.label} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5 hover:bg-gray-800/80 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 bg-gradient-to-r ${card.color} rounded-xl`}><card.icon className="w-4 h-4 text-white" /></div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-white">{card.value}</p>
              <p className="text-xs text-gray-400 mt-1">{card.label}</p>
              <p className="text-xs text-gray-500">{card.sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* Week/Month summary */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Weekly Visitors", value: stats.week.uniqueVisitors, views: stats.week.pageViews },
            { label: "Monthly Visitors", value: stats.month.uniqueVisitors, views: stats.month.pageViews },
            { label: "Returning Visitors", value: stats.total.returningVisitors, views: null },
            { label: "Total Page Views", value: stats.total.pageViews, views: null },
          ].map((item) => (
            <div key={item.label} className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
              <p className="text-lg font-bold text-white">{item.value}</p>
              <p className="text-xs text-gray-400">{item.label}</p>
              {item.views !== null && <p className="text-xs text-gray-500">{item.views} views</p>}
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-800/50 p-1 rounded-xl border border-gray-700/50 overflow-x-auto">
        {(["overview", "projects", "resume", "activity"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" : "text-gray-400 hover:text-white hover:bg-gray-700/50"}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Visitor Trend Chart */}
          {trend.length > 0 && (
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
              <h3 className="text-base font-semibold text-white mb-4">Visitor Trend (30 Days)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trend}>
                    <defs>
                      <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" tickFormatter={(val: any) => formatDate(val)} stroke="#6b7280" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
                    {/* <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "12px", color: "#fff", fontSize: 13 }} labelFormatter={(label) => formatDate(String(label))} /> */}
                    <Tooltip
                      contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: 13
                    }}
                    labelFormatter={(label) => formatDate(String(label))}
/>

                    <Area type="monotone" dataKey="views" stroke="#3b82f6" fill="url(#viewsGrad)" strokeWidth={2} name="Page Views" />
                    <Area type="monotone" dataKey="visitors" stroke="#8b5cf6" fill="url(#visitorsGrad)" strokeWidth={2} name="Unique Visitors" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Device & Browser Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Device Pie */}
            {devices.devices.length > 0 && (
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2"><HiDeviceMobile className="w-4 h-4 text-gray-400" /> Devices</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={devices.devices} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={70} label={(props: any) => `${props._id || props.name} ${((props.percent || 0) * 100).toFixed(0)}%`} labelLine={false}>
                        {devices.devices.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "12px", color: "#fff", fontSize: 13 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Browser Bar */}
            {devices.browsers.length > 0 && (
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2"><HiDesktopComputer className="w-4 h-4 text-gray-400" /> Browsers</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={devices.browsers} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis type="number" stroke="#6b7280" tick={{ fontSize: 11 }} />
                      <YAxis dataKey="_id" type="category" stroke="#6b7280" tick={{ fontSize: 11 }} width={60} />
                      <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "12px", color: "#fff", fontSize: 13 }} />
                      <Bar dataKey="count" fill="#3b82f6" radius={[0, 6, 6, 0]} name="Views" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {/* Countries & OS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {devices.countries.length > 0 && (
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2"><HiGlobe className="w-4 h-4 text-gray-400" /> Top Countries</h3>
                <div className="space-y-2">
                  {devices.countries.map((c, i) => (
                    <div key={c._id} className="flex items-center justify-between py-2 px-3 bg-gray-700/20 rounded-lg">
                      <span className="text-sm text-gray-300">{i + 1}. {c._id}</span>
                      <span className="text-sm font-medium text-white">{c.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {devices.operatingSystems.length > 0 && (
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-white mb-4">Operating Systems</h3>
                <div className="space-y-2">
                  {devices.operatingSystems.map((os, i) => (
                    <div key={os._id} className="flex items-center justify-between py-2 px-3 bg-gray-700/20 rounded-lg">
                      <span className="text-sm text-gray-300">{i + 1}. {os._id}</span>
                      <span className="text-sm font-medium text-white">{os.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
          <h3 className="text-base font-semibold text-white mb-4">Project Click Analytics</h3>
          {projectStats.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No project click data yet.</p>
          ) : (
            <>
              <div className="h-56 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="_id" stroke="#6b7280" tick={{ fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={50} />
                    <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "12px", color: "#fff", fontSize: 13 }} />
                    <Bar dataKey="clicks" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Clicks" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {projectStats.map((p, i) => (
                  <div key={p._id} className="flex items-center justify-between py-3 px-4 bg-gray-700/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-500 w-5">#{i + 1}</span>
                      <span className="text-sm font-medium text-white">{p._id}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-purple-400">{p.clicks} clicks</span>
                      <span className="text-xs text-gray-500">{timeAgo(p.lastClicked)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Resume Tab */}
      {activeTab === "resume" && resumeData && (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white">Resume Downloads</h3>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full">{resumeData.totalDownloads} total</span>
          </div>
          {resumeData.downloads.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No resume downloads yet.</p>
          ) : (
            <div className="space-y-2">
              {resumeData.downloads.map((dl, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-4 bg-gray-700/20 rounded-xl gap-2">
                  <div className="flex items-center gap-3">
                    <HiDownload className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white">{dl.device} • {dl.browser} • {dl.os}</p>
                      <p className="text-xs text-gray-500">{dl.country}{dl.city !== "Unknown" ? `, ${dl.city}` : ""}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(dl.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === "activity" && (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
          <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2"><HiClock className="w-4 h-4 text-gray-400" /> Recent Activity</h3>
          {activity.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No activity recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {activity.map((item) => (
                <div key={item._id} className="flex items-start gap-3 py-3 px-4 bg-gray-700/20 rounded-xl">
                  <div className="mt-0.5 flex-shrink-0">{eventIcon(item.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{eventLabel(item)}</p>
                    <p className="text-xs text-gray-500">{item.device} • {item.browser} • {item.country}{item.city !== "Unknown" ? `, ${item.city}` : ""}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(item.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* No data state */}
      {!stats && !loading && (
        <div className="text-center py-16 bg-gray-800/50 border border-gray-700/50 rounded-2xl">
          <HiChartBar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Analytics Data Yet</h3>
          <p className="text-gray-400 text-sm">Visit your portfolio to start generating tracking data.</p>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
