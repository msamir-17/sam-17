'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import Link from 'next/link';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

interface Certificate {
    _id: string;
    title: string;
    issuedBy: string;
    dateEarned: string;
    category: string;
    certificateLink?: string;
}

const CertificatePage = () => {
    const [Certificate, setCertificate] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                // const response = await api.get('http://localhost:5000/api/certificates');
                const response = await api.get('/certificates')
                setCertificate(response.data);
            } catch (err) {
                setError('Failed to fetch Certificate.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCertificate();
    }, []);

    const handleDelete = async (certificateId: string) => {
        if (!window.confirm('Are you sure you want to delete this Certificate?')) return;

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('Authentication error. Please log in again.');
                return;
            }

            await api.delete(`/certificates/${certificateId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setCertificate(Certificate.filter(p => p._id !== certificateId));
        } catch (err) {
            alert('Failed to delete Certificate.');
            console.error(err);
        }
    };

    if (loading) return <p className="text-center mt-8">Loading Certificates...</p>;
    if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">Manage Certificates</h1>
                <Link href="/admin/certificates/add">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                        + Add New Certificate
                    </button>
                </Link>
            </div>

            {/* Desktop / Tablet Table View */}
            <div className="hidden md:block bg-gray-800 rounded-lg shadow">
                <table className="w-full text-left text-sm md:text-base">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Title</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Issued By</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Date Earned</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Category</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Certificate</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {Certificate.length > 0 ? (
                            Certificate.map((certificate) => (
                                <tr key={certificate._id} className="hover:bg-gray-700/50 transition">
                                    <td className="px-6 py-4">{certificate.title}</td>
                                    <td className="px-6 py-4 text-gray-300">{certificate.issuedBy}</td>
                                    <td className="px-6 py-4 text-gray-300">{certificate.dateEarned}</td>
                                    <td className="px-6 py-4 text-gray-400">{certificate.category}</td>
                                    <td className="px-6 py-4">
                                        {certificate.certificateLink ? (
                                            <a
                                                href={certificate.certificateLink}
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
                                            <Link href={`/admin/certificates/edit/${certificate._id}`}>
                                                <button className="p-2 rounded-full hover:bg-gray-700 transition" title="Edit">
                                                    <HiOutlinePencil className="w-5 h-5 text-blue-400" />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(certificate._id)}
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
                                    No Certificates found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {Certificate.length > 0 ? (
                    Certificate.map((certificate) => (
                        <div
                            key={certificate._id}
                            className="bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition"
                        >
                            <h2 className="text-lg font-semibold text-white mb-1">{certificate.title}</h2>
                            <p className="text-sm text-gray-400 mb-2">{certificate.issuedBy}</p>

                            <div className="text-sm text-gray-300 mb-2">
                                <span className="font-medium">Date:</span> {certificate.dateEarned}
                            </div>
                            <div className="text-sm text-gray-300 mb-2">
                                <span className="font-medium">Category:</span> {certificate.category}
                            </div>

                            {certificate.certificateLink ? (
                                <a
                                    href={certificate.certificateLink}
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
                                <Link href={`/admin/certificates/edit/${certificate._id}`}>
                                    <button className="p-2 rounded-full hover:bg-gray-700 transition" title="Edit">
                                        <HiOutlinePencil className="w-5 h-5 text-blue-400" />
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleDelete(certificate._id)}
                                    className="p-2 rounded-full hover:bg-gray-700 transition"
                                    title="Delete"
                                >
                                    <HiOutlineTrash className="w-5 h-5 text-red-400" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-2">No Certificates found.</p>
                )}
            </div>
        </div>
    );
};

export default CertificatePage;
