// In portfolio/src/app/admin/(protected)/hero/page.tsx

'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const EditHeroPage = () => {
    const router = useRouter();

    const [greeting, setGreeting] = useState('');
    const [name, setName] = useState('');
    const [jobTitles, setJobTitles] = useState('');
    const [bio, setBio] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [newResumeFile, setNewResumeFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/hero`);
                const data = response.data;
                if (data) {
                    setGreeting(data.greeting);
                    setName(data.name);
                    setJobTitles(data.jobTitles.join(', '));
                    setBio(data.bio);
                    setResumeUrl(data.resumeUrl);
                }
            } catch (err) {
                setError('Failed to fetch hero data.');
            } finally {
                setLoading(false);
            }
        };
        fetchHeroData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        setError('');

        const formData = new FormData();
        formData.append('greeting', greeting);
        formData.append('name', name);
        formData.append('jobTitles', jobTitles);
        formData.append('bio', bio);
        if (newResumeFile) {
            formData.append('resume', newResumeFile);
        }

        try {
            const token = localStorage.getItem('authToken');
            await axios.put(`http://localhost:5000/api/hero`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Hero section updated successfully!');
            router.refresh(); // Page ko refresh karega naya data dikhane ke liye
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update hero section.');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <p>Loading Hero Data...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Edit Hero Section</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg">
                {/* Greeting */}
                <div>
                    <label htmlFor="greeting">Greeting</label>
                    <input id="greeting" value={greeting} onChange={(e) => setGreeting(e.target.value)} className="input-field" />
                </div>
                {/* Name */}
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="input-field" />
                </div>
                {/* Job Titles */}
                <div>
                    <label htmlFor="jobTitles">Job Titles (comma-separated)</label>
                    <input id="jobTitles" value={jobTitles} onChange={(e) => setJobTitles(e.target.value)} required className="input-field" />
                </div>
                {/* Bio */}
                <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} required rows={3} className="input-field"></textarea>
                </div>
                {/* Resume */}
                <div>
                    <label>Resume</label>
                    {resumeUrl && <a href={resumeUrl} target="_blank" className="text-blue-400 block my-2">View Current Resume</a>}
                    <input type="file" onChange={(e) => e.target.files && setNewResumeFile(e.target.files[0])} accept=".pdf" className="mt-2 text-sm ..." />
                </div>
                <button type="submit" disabled={updating} className="px-6 py-2 rounded-md ...">
                    {updating ? 'Updating...' : 'Update Hero Section'}
                </button>
            </form>
        </div>
    );
};
export default EditHeroPage;