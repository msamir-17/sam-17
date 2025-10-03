'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

interface Internship {
    _id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
    certificateUrl?: string;
}

const InternshipPage = () => {
    const [Internship, setInternship] = useState<Internship[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInternship = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/Internships');
                setInternship(response.data);
            } catch (err) {
                setError('Failed to fetch Internship.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchInternship();
    }, []);

    const handleDelete = async (internshipId: string) => {
        if (!window.confirm('Are you sure you want to delete this internship?')) return;

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('Authentication error. Please log in again.');
                return;
            }

            await axios.delete(`http://localhost:5000/api/internships/${internshipId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setInternship(Internship.filter(p => p._id !== internshipId));
        } catch (err) {
            alert('Failed to delete internship.');
            console.error(err);
        }
    };

    if (loading) return <p className="text-center mt-8">Loading Internship...</p>;
    if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">Manage Internship</h1>
                <Link href="/admin/internship/add">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                        + Add New Internship
                    </button>
                </Link>
            </div>

            {/* Desktop / Tablet Table View */}
            <div className="hidden md:block bg-gray-800 rounded-lg shadow">
                <table className="w-full text-left text-sm md:text-base">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Company</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Role</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Duration</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Description</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Certificate</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {Internship.length > 0 ? (
                            Internship.map((internship) => (
                                <tr key={internship._id} className="hover:bg-gray-700/50 transition">
                                    <td className="px-6 py-4">{internship.company}</td>
                                    <td className="px-6 py-4 text-gray-300">{internship.role}</td>
                                    <td className="px-6 py-4 text-gray-300">{internship.duration}</td>
                                    <td className="px-6 py-4 max-w-xs truncate text-gray-400">{internship.description}</td>
                                    <td className="px-6 py-4">
                                        {internship.certificateUrl ? (
                                            <a
                                                href={internship.certificateUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-emerald-400 hover:underline"
                                            >
                                                View
                                            </a>
                                        ) : (
                                            <span className="text-gray-500">None</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-3">
                                            <Link href={`/admin/internship/edit/${internship._id}`}>
                                                <button className="p-2 rounded-full hover:bg-gray-700 transition" title="Edit">
                                                    <HiOutlinePencil className="w-5 h-5 text-blue-400" />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(internship._id)}
                                                className="p-2 rounded-full hover:bg-gray-700 transition"
                                                title="Delete"
                                            >
                                                <HiOutlineTrash className="w-5 h-5 text-red-400" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500">
                                    No Internship found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {Internship.length > 0 ? (
                    Internship.map((internship) => (
                        <div
                            key={internship._id}
                            className="bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition"
                        >
                            <h2 className="text-lg font-semibold text-white mb-1">{internship.company}</h2>
                            <p className="text-sm text-gray-400 mb-2">{internship.role}</p>

                            <div className="text-sm text-gray-300 mb-2">
                                <span className="font-medium">Duration:</span> {internship.duration}
                            </div>

                            <p className="text-sm text-gray-400 line-clamp-3 mb-3">
                                {internship.description}
                            </p>

                            {internship.certificateUrl ? (
                                <a
                                    href={internship.certificateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:underline text-sm"
                                >
                                    View Certificate
                                </a>
                            ) : (
                                <p className="text-gray-500 text-sm">No Certificate</p>
                            )}

                            <div className="flex justify-end gap-3 mt-3">
                                <Link href={`/admin/internship/edit/${internship._id}`}>
                                    <button className="p-2 rounded-full hover:bg-gray-700 transition" title="Edit">
                                        <HiOutlinePencil className="w-5 h-5 text-blue-400" />
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleDelete(internship._id)}
                                    className="p-2 rounded-full hover:bg-gray-700 transition"
                                    title="Delete"
                                >
                                    <HiOutlineTrash className="w-5 h-5 text-red-400" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-2">No Internship found.</p>
                )}
            </div>
        </div>
    );
};

export default InternshipPage;
