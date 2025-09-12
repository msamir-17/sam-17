
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { HiOutlineExternalLink, HiOutlineCode, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

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

    // --- NAYA FUNCTION: internship ko delete karne ke liye ---
    const handleDelete = async (internshipId: string) => {
        // Step 1: User se confirmation maangein
        if (!window.confirm('Are you sure you want to delete this internship?')) {
            return;
        }

        try {
            // Step 2: LocalStorage se token nikalein
            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('Authentication error. Please log in again.');
                return;
            }

            // Step 3: Backend ke DELETE endpoint par request bhejein
            await axios.delete(`http://localhost:5000/api/internships/${internshipId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Step 4: Frontend ki state se us internship ko hata dein
            setInternship(Internship.filter(p => p._id !== internshipId));

        } catch (err) {
            alert('Failed to delete internship.');
            console.error(err);
        }
    };

    if (loading) return <p className="text-center mt-8">Loading Internship...</p>;
    if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

    return (
        <div>
            {/* ... baaki ka UI (header, link) waise hi rahega ... */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Internship</h1>
                <Link href="/admin/internship/add">
                    <button className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        + Add New Internship
                    </button>
                </Link>
            </div>

            <div className="bg-gray-800 rounded-lg shadow overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-700">
                        {/* ... table header waise hi rahega ... */}
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Company</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Role</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Duration</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Description</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {Internship.length > 0 ? (
                            Internship.map((internship) => (
                                <tr key={internship._id} className="hover:bg-gray-700/50">
                                    {/* ... baaki ke table cells (td) waise hi rahenge ... */}
                                    <td className="px-6 py-4">
                                        {internship.company}
                                    </td>
                                    <td className="px-6 py-4 max-w-sm">
                                        <p className="text-sm text-gray-400 truncate">{internship.description}</p>
                                    </td>
                                    <td className="px-6 py-4 max-w-sm">
                                        <p className="text-sm text-gray-400 truncate">{internship.role}</p>
                                    </td>
                                    <td className="px-6 py-4 max-w-sm">
                                        <p className="text-sm text-gray-400 truncate">{internship.duration}</p>
                                    </td>


                                    <td className="px-6 py-4">
                                        {internship.certificateUrl ? (
                                            <a href={internship.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                                                View
                                            </a>
                                        ) : (
                                            <span className="text-gray-500">None</span>
                                        )}
                                    </td>


                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end items-center gap-4">
                                            <button className="p-2 rounded-full hover:bg-gray-700" title="Edit">
                                                <Link href={`/admin/internship/edit/${internship._id}`} >
                                                    <HiOutlinePencil className="w-5 h-5 text-blue-400" />
                                                </Link>
                                            </button>
                                            {/* --- NAYA BADLAAV: Delete button mein onClick add kiya --- */}
                                            <button
                                                onClick={() => handleDelete(internship._id)}
                                                className="p-2 rounded-full hover:bg-gray-700"
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
                                <td colSpan={5} className="text-center py-10 text-gray-500">
                                    No Internship found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InternshipPage;