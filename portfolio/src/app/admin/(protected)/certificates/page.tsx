
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { HiOutlineExternalLink, HiOutlineCode, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

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
                const response = await axios.get('http://localhost:5000/api/certificates');
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

    // --- NAYA FUNCTION: Certificate ko delete karne ke liye ---
    const handleDelete = async (certificateId: string) => {
        // Step 1: User se confirmation maangein
        if (!window.confirm('Are you sure you want to delete this Certificate?')) {
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
            await axios.delete(`http://localhost:5000/api/certificates/${certificateId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Step 4: Frontend ki state se us Certificate ko hata dein
            setCertificate(Certificate.filter(p => p._id !== certificateId));

        } catch (err) {
            alert('Failed to delete Certificate.');
            console.error(err);
        }
    };

    if (loading) return <p className="text-center mt-8">Loading Certificate...</p>;
    if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

    return (
        <div>
            {/* ... baaki ka UI (header, link) waise hi rahega ... */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Certificate</h1>
                <Link href="/admin/certificates/add">
                    <button className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        + Add New Certificate
                    </button>
                </Link>
            </div>

            <div className="bg-gray-800 rounded-lg shadow overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-700">
                        {/* ... table header waise hi rahega ... */}
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">title</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">issuedBy</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">dateEarned</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">category</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm">Certificate</th>
                            <th className="px-6 py-4 font-semibold uppercase text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {Certificate.length > 0 ? (
                            Certificate.map((Certificate) => (
                                <tr key={Certificate._id} className="hover:bg-gray-700/50">
                                    {/* ... baaki ke table cells (td) waise hi rahenge ... */}
                                    <td className="px-6 py-4">
                                        {Certificate.title}
                                    </td>
                                    <td className="px-6 py-4 max-w-sm">
                                        <p className="text-sm text-gray-400 truncate">{Certificate.category}</p>
                                    </td>
                                    <td className="px-6 py-4 max-w-sm">
                                        <p className="text-sm text-gray-400 truncate">{Certificate.issuedBy}</p>
                                    </td>
                                    <td className="px-6 py-4 max-w-sm">
                                        <p className="text-sm text-gray-400 truncate">{Certificate.dateEarned}</p>
                                    </td>


                                    <td className="px-6 py-4">
                                        {Certificate.certificateLink ? (
                                            <a href={Certificate.certificateLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                                                View
                                            </a>
                                        ) : (
                                            <span className="text-gray-500">None</span>
                                        )}
                                    </td>


                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end items-center gap-4">
                                            <button className="p-2 rounded-full hover:bg-gray-700" title="Edit">
                                                <Link href={`/admin/certificates/edit/${Certificate._id}`} >
                                                    <HiOutlinePencil className="w-5 h-5 text-blue-400" />
                                                </Link>
                                            </button>
                                            {/* --- NAYA BADLAAV: Delete button mein onClick add kiya --- */}
                                            <button
                                                onClick={() => handleDelete(Certificate._id)}
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
                                    No Certificate found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CertificatePage;