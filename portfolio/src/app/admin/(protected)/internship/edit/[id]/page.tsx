
'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from '@/lib/axios';

const EditInternshipPage = () => {

    const params = useParams();
    const id = params.id;

    const router = useRouter();

    const [company, setCompany] = useState('');
    const [description, setDescription] = useState('');
    const [role, setRole] = useState('');
    const [duration, setduration] = useState('');
    const [certificate, setCertificate] = useState<File | null>(null);

    const [certificatePreview, setCertificatePreview] = useState('');
    const [newcertificate, setNewcertificate] = useState<File | null>(null); // Nayi certificate ke liye state

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // // Ab Step 4 (useEffect) ka code yahan aayega... waali line ko isse replace karein

    useEffect(() => {
        // Agar ID nahi hai, toh kuch mat karo
        if (!id) return;
        console.log("Fetching Internship data for ID:", id);

        const fetchInternship = async () => {
            try {
                setLoading(true); // Data fetch shuru hone par loading dikhao

                // Backend se us ek Internship ka data laao
                // const response = await api.get(`http://localhost:5000/api/internships/${id}`);
                const response = await api.get(`/internships/${id}`);
                console.log(response.data)
                // Backend se aaye data ko ek variable mein rakho
                const InternshipData = response.data;

                // Saari states ko us data se update karo
                setCompany(InternshipData.company);
                setDescription(InternshipData.description);
                // Agar role array hai toh use join karo, warna empty string rakho
                setRole(InternshipData.role);
                setduration(InternshipData.duration || ''); // Agar duration nahi hai, toh empty string
                setCertificatePreview(InternshipData.certificateUrl); // certificate preview ke liye URL set karo

            } catch (err) {
                setError('Failed to fetch Internship data. Please try again.');
                console.error(err);
            } finally {
                setLoading(false); // Data fetch ho gaya (ya fail), ab loading band kar do
            }
        };

        fetchInternship(); // Is function ko call karo

    }, [id]);
    // Yeh effect tabhi chalega jab 'id' ki value badlegi

    // useEffect ke baad yeh function add karein

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        
        formData.append('company', company);
        formData.append('description', description);
        formData.append('role', role);
        formData.append('duration', duration);
        
        // formData.append('certificateUrl', certificatePreview); // Purani certificate URL bhi bhejein
        
        // Sirf tabhi certificate add karo agar user ne nayi file select ki hai
        if (newcertificate) {
            formData.append('certificate', newcertificate);
        }

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Authentication error. Please log in again.');
                return;
            }

            // Backend ke PUT endpoint par request bhejein
            await api.put(`/internships/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            router.push('/admin/internship'); // Update safal hone par wapas list par bhej do

        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update Internship.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <p className="text-center mt-8">Loading Internship data...</p>;
    }

    if (error) {
        return <p className="text-center mt-8 text-red-500">{error}</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Edit Internship: <span className="text-blue-500">{company}</span></h1>

            {/* Hum yahan handleSubmit ko call karenge, jo hum agle step mein banayenge */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg">

                {/* company */}
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-400">company</label>
                    <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} required className="input-field" />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-400">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="input-field"></textarea>
                </div>                

                {/* Role */}
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-400">Role</label>
                    <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} required className="input-field" />
                </div>

                {/* Live URL */}
                <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-400">Duration </label>
                    <input type="text" id="duration" value={duration} onChange={(e) => setduration(e.target.value)} className="input-field" />
                </div>

                {/* certificate Upload */}
                <div>
                    <label htmlFor="certificate" className="block text-sm font-medium text-gray-400">Change Internship certificate</label>
                    {/* Purani certificate ka preview dikhayein */}
                    {certificatePreview && (
                        <img src={certificatePreview} alt="Current Internship certificate" className="w-40 h-24 object-cover rounded-md my-4" />
                    )}
                    <input
                        type="file"
                        id="certificate"
                        onChange={(e) => {
                            if (e.target.files) {
                                setNewcertificate(e.target.files[0]);
                                // Nayi certificate select hone par preview bhi badal dein
                                setCertificatePreview(URL.createObjectURL(e.target.files[0]));
                            }
                        }}
                        accept="certificate/*"
                        className="mt-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                    <p className="text-xs text-gray-500 mt-2">Select a new file only if you want to replace the current certificate.</p>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-500">Cancel</button>
                    <button type="submit" disabled={loading} className="...">
                        {loading ? 'Updating...' : 'Update Internship'}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default EditInternshipPage;