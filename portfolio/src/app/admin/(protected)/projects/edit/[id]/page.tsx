// In portfolio/src/app/admin/(protected)/projects/edit/[id]/page.tsx

'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from '@/lib/axios'

const EditProjectPage = () => {
    // --- All your State and Logic (useEffect, handleSubmit) remains exactly the same ---
    const params = useParams();
    const id = params.id;
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [liveUrl, setLiveUrl] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [newImage, setNewImage] = useState<File | null>(null);

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        const fetchProject = async () => {
            try {
                const response = await api.get(`http://localhost:5000/api/projects/${id}`);
                const projectData = response.data;
                setTitle(projectData.title);
                setDescription(projectData.description);
                setTechnologies(projectData.technologies ? projectData.technologies.join(', ') : '');
                setGithubUrl(projectData.githubUrl);
                setLiveUrl(projectData.liveUrl || '');
                setImagePreview(projectData.imageUrl);
            } catch (err) {
                setError('Failed to fetch project data.');
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        setError('');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('technologies', technologies);
        formData.append('githubUrl', githubUrl);
        formData.append('liveUrl', liveUrl);
        if (newImage) {
            formData.append('image', newImage);
        }
        try {
            const token = localStorage.getItem('authToken');
            // await api.put(`http://localhost:5000/api/projects/${id}`, formData, {
            await api.put(`/projects/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
            });
            router.push('/admin/projects');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update project.');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <p className="text-center mt-8">Loading project data...</p>;
    if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

    // --- RESPONSIVE UI STARTS HERE ---
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Edit Project: <span className="text-blue-500 truncate">{title}</span></h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2"><label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Title</label><input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="input-field" /></div>
                    <div className="md:col-span-2"><label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">Description</label><textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="input-field"></textarea></div>
                    <div className="md:col-span-2"><label htmlFor="technologies" className="block text-sm font-medium text-gray-400 mb-1">Technologies (comma-separated)</label><input type="text" id="technologies" value={technologies} onChange={(e) => setTechnologies(e.target.value)} required className="input-field" /></div>
                    <div><label htmlFor="githubUrl" className="block text-sm font-medium text-gray-400 mb-1">GitHub URL</label><input type="url" id="githubUrl" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} required className="input-field" /></div>
                    <div><label htmlFor="liveUrl" className="block text-sm font-medium text-gray-400 mb-1">Live URL (optional)</label><input type="url" id="liveUrl" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="input-field" /></div>
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-400 mb-1">Change Project Image</label>
                    {imagePreview && (<img src={imagePreview} alt="Current project" className="w-40 h-auto object-cover rounded-lg my-4 border-2 border-gray-700" />)}
                    <input type="file" id="image" onChange={(e) => { if (e.target.files) { setNewImage(e.target.files[0]); setImagePreview(URL.createObjectURL(e.target.files[0])); } }} accept="image/*" className="mt-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"/>
                    <p className="text-xs text-gray-500 mt-2">Select a new file only if you want to replace the current image.</p>
                </div>
                {error && <p className="text-sm text-center text-red-500 py-2">{error}</p>}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                    <button type="button" onClick={() => router.back()} className="w-full sm:w-auto px-6 py-3 rounded-lg text-white bg-gray-600 hover:bg-gray-500 transition-colors font-semibold">Cancel</button>
                    <button type="submit" disabled={updating} className="w-full sm:w-auto px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-semibold">
                        {updating ? 'Updating...' : 'Update Project'}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default EditProjectPage;