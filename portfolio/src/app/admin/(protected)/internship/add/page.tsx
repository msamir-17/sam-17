// In portfolio/src/app/admin/(protected)/internships/add/page.tsx

'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddInternshipPage = () => {
    // Step 1: Har form field ke liye state banayein
    const [company, setCompany] = useState('');
    const [description, setDescription] = useState('');
    const [role, setRole] = useState(''); // Comma-separated string
    const [duration, setduration] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

   

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setLoading(true);
        setError('');

        // Step 2: form-data ka istemaal karein, kyunki hum file bhej rahe hain
        const internshipData = {
            company,
            description,
            role,
            duration
        }

        try {
            // Step 3: LocalStorage se token nikalein
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Authentication error. Please log in again.');
                setLoading(false);
                return;
            }

            // Step 4: Backend par data bhejein
            await axios.post('http://localhost:5000/api/internships', internshipData, {
                headers: {
                    'Authorization': `Bearer ${token}` // Token ko headers mein bhejein
                }
            });

            // Safal hone par internships page par wapas bhej dein
            router.push('/admin/internship');

        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add project.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Add New Internship</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg">
                
                {/* company */}
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-400">Company</label>
                    <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} required className="input-field" />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-400">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="input-field"></textarea>
                </div>

                {/* role */}
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-400">Role </label>
                    <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} required className="input-field" />
                </div>

                {/* Duration */}
                <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-400">Duration</label>
                    <input type="text" id="duration" value={duration} onChange={(e) => setduration(e.target.value)} required className="input-field" />
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