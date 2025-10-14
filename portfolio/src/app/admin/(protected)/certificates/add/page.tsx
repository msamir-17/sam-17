

'use client';

import { useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddCertificatePage = () => {
    const [title, settitle] = useState('');
    const [issuedBy, setIssuedBy] = useState('');
    const [category, setCategory] = useState('');
    const [certificateFile, setCertificateFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const [dateEarned, setDateEarned] = useState<Date | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCertificateFile(e.target.files[0]);
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Pehle check karein ki date select hui hai ya nahi
        if (!dateEarned) {
            setError('Please select the date earned.');
            return;
        }
        // File ko required banayein
        if (!certificateFile) {
            setError('Please select a certificate file.');
            return;
        }
        setLoading(true);
        setError('');



        const formData = new FormData();
        formData.append('title', title);
        formData.append('issuedBy', issuedBy);
        formData.append('dateEarned', dateEarned.toLocaleDateString('en-GB'));
        formData.append('category', category);

        // Agar user ne file select ki hai, tabhi use FormData mein add karo
        if (certificateFile) {
            formData.append('certificateFile', certificateFile);
        }

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Authentication error. Please log in again.');
                setLoading(false);
                return;
            }

            await api.post('http://localhost:5000/api/certificates', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            router.push('/admin/certificates');

        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add Certificate.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Add New Certificate</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-400">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => settitle(e.target.value)} required className="input-field" />
                </div>
                <div>
                    <label htmlFor="issuedBy" className="block text-sm font-medium text-gray-400">IssuedBy</label>
                    <input type="text" id="issuedBy" value={issuedBy} onChange={(e) => setIssuedBy(e.target.value)} required className="input-field" />
                </div>
                <div>
                    <label htmlFor="dateEarned" className="block text-sm font-medium text-gray-400">
                        Date Earned
                    </label>
                    <DatePicker
                        selected={dateEarned}
                        onChange={(date) => setDateEarned(date)}
                        dateFormat="dd/MM/yyyy"
                        className="input-field" // Hum wahi class use kar rahe hain
                        placeholderText="Select the date"
                        required // Ise required banayein
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-400">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="input-field"
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="Course">Course</option>
                        <option value="Participation">Participation</option>
                        <option value="Hackathon">Hackathon</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Competition">Competition</option>
                        <option value="Sports">Sports</option>
                        <option value="Other">Other</option>
                    </select>
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
                        {loading ? 'Adding...' : 'Add Certificate'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCertificatePage;