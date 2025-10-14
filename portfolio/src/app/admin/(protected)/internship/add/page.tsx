// In portfolio/src/app/admin/(protected)/internships/add/page.tsx

'use client';

import { useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

const AddInternshipPage = () => {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [certificateFile, setCertificateFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCertificateFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('company', company);
        formData.append('role', role);
        formData.append('duration', duration);
        formData.append('description', description);
        
        // Agar user ne file select ki hai, tabhi use FormData mein add karo
        if (certificateFile) {
            formData.append('certificate', certificateFile);
        }

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Authentication error. Please log in again.');
                setLoading(false);
                return;
            }

            await api.post('http://localhost:5000/api/internships', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            router.push('/admin/internship');

        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add internship.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Add New Internship</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg">
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-400">Company</label>
                    <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} required className="input-field" />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-400">Role</label>
                    <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} required className="input-field" />
                </div>
                <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-400">Duration</label>
                    <input type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} required className="input-field" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-400">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="input-field"></textarea>
                </div>
                <div>
                    <label htmlFor="certificate" className="block text-sm font-medium text-gray-400">Completion Certificate (Optional)</label>
                    <input
                        type="file"
                        id="certificate"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        className="mt-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-500">Cancel</button>
                    <button type="submit" disabled={loading} className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400">
                        {loading ? 'Adding...' : 'Add Internship'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddInternshipPage;