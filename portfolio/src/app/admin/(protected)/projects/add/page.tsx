// In portfolio/src/app/admin/(protected)/projects/add/page.tsx

'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddProjectPage = () => {
    // Step 1: Har form field ke liye state banayein
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState(''); // Comma-separated string
    const [githubUrl, setGithubUrl] = useState('');
    const [liveUrl, setLiveUrl] = useState('');
    const [image, setImage] = useState<File | null>(null); // Image file ke liye

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            setError('Please select an image for the project.');
            return;
        }
        setLoading(true);
        setError('');

        // Step 2: form-data ka istemaal karein, kyunki hum file bhej rahe hain
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('technologies', technologies);
        formData.append('githubUrl', githubUrl);
        formData.append('liveUrl', liveUrl);
        formData.append('image', image);

        try {
            // Step 3: LocalStorage se token nikalein
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Authentication error. Please log in again.');
                setLoading(false);
                return;
            }

            // Step 4: Backend par data bhejein
            await axios.post('http://localhost:5000/api/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Token ko headers mein bhejein
                }
            });

            // Safal hone par projects page par wapas bhej dein
            router.push('/admin/projects');

        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add project.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Add New Project</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg">
                
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-400">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="input-field" />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-400">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="input-field"></textarea>
                </div>

                {/* Technologies */}
                <div>
                    <label htmlFor="technologies" className="block text-sm font-medium text-gray-400">Technologies (comma-separated)</label>
                    <input type="text" id="technologies" value={technologies} onChange={(e) => setTechnologies(e.target.value)} required className="input-field" />
                </div>

                {/* GitHub URL */}
                <div>
                    <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-400">GitHub URL</label>
                    <input type="url" id="githubUrl" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} required className="input-field" />
                </div>

                {/* Live URL */}
                <div>
                    <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-400">Live URL (optional)</label>
                    <input type="url" id="liveUrl" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="input-field" />
                </div>
                
                {/* Image Upload */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-400">Project Image</label>
                    <input type="file" id="image" onChange={handleImageChange} required accept="image/*" className="mt-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"/>
                </div>


                {error && <p className="text-sm text-red-500">{error}</p>}
                
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-500">Cancel</button>
                    <button type="submit" disabled={loading} className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400">
                        {loading ? 'Adding...' : 'Add Project'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProjectPage;