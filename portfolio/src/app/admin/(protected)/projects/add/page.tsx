'use client';

import { useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

const AddProjectPage = () => {
    // --- All your State and Logic (handleSubmit, etc.) remains exactly the same ---
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [liveUrl, setLiveUrl] = useState('');
    const [image, setImage] = useState<File | null>(null);

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

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('technologies', technologies);
        formData.append('githubUrl', githubUrl);
        formData.append('liveUrl', liveUrl);
        formData.append('image', image);

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Authentication error. Please log in again.');
                setLoading(false);
                return;
            }

            await api.post('http://localhost:5000/api/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            router.push('/admin/projects');

        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add project.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // --- RESPONSIVE UI STARTS HERE ---
    return (
        // Use a max-width to keep the form centered and readable on large screens
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Add New Project</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
                
                {/* Use a grid layout for better alignment on medium screens and up */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title (Takes full width on all screens) */}
                    <div className="md:col-span-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="input-field" />
                    </div>

                    {/* Description (Takes full width on all screens) */}
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="input-field"></textarea>
                    </div>

                    {/* Technologies (Takes full width on all screens) */}
                    <div className="md:col-span-2">
                        <label htmlFor="technologies" className="block text-sm font-medium text-gray-400 mb-1">Technologies (comma-separated)</label>
                        <input type="text" id="technologies" value={technologies} onChange={(e) => setTechnologies(e.target.value)} required className="input-field" />
                    </div>

                    {/* GitHub URL (Takes half width on medium screens) */}
                    <div>
                        <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-400 mb-1">GitHub URL</label>
                        <input type="url" id="githubUrl" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} required className="input-field" />
                    </div>

                    {/* Live URL (Takes half width on medium screens) */}
                    <div>
                        <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-400 mb-1">Live URL (optional)</label>
                        <input type="url" id="liveUrl" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="input-field" />
                    </div>
                </div>
                
                {/* Image Upload */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-400 mb-1">Project Image</label>
                    <input type="file" id="image" onChange={handleImageChange} required accept="image/*" className="mt-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"/>
                </div>


                {error && <p className="text-sm text-center text-red-500 py-2">{error}</p>}
                
                {/* Button layout that adapts to screen size */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                    <button 
                        type="button" 
                        onClick={() => router.back()} 
                        className="w-full sm:w-auto px-6 py-3 rounded-lg text-white bg-gray-600 hover:bg-gray-500 transition-colors font-semibold"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full sm:w-auto px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-semibold"
                    >
                        {loading ? 'Adding...' : 'Add Project'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProjectPage;