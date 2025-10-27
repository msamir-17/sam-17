// // In portfolio/src/app/admin/(protected)/projects/page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// // --- NAYI CHEEZ: Icons ko import karein ---
// import { HiOutlineExternalLink, HiOutlineCode, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

// interface Project {
//     _id: string;
//     title: string;
//     description: string;
//     technologies: string[];
//     imageUrl: string;
//     githubUrl: string;
//     liveUrl?: string; // liveUrl optional hai
// }

// const ProjectsPage = () => {
//     const [projects, setProjects] = useState<Project[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/projects');
//                 setProjects(response.data);
//             } catch (err) {
//                 setError('Failed to fetch projects.');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProjects();
//     }, []);

//     if (loading) return <p className="text-center mt-8">Loading projects...</p>;
//     if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold">Manage Projects</h1>
//                 <Link href="/admin/projects/add">
//                     <button className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
//                         + Add New Project
//                     </button>
//                 </Link>
//             </div>

//             <div className="bg-gray-800 rounded-lg shadow overflow-x-auto">
//                 <table className="w-full text-left">
//                     <thead className="bg-gray-700">
//                         <tr>
//                             <th className="px-6 py-4 font-semibold uppercase text-sm">Image</th>
//                             <th className="px-6 py-4 font-semibold uppercase text-sm">Title & Description</th>
//                             <th className="px-6 py-4 font-semibold uppercase text-sm">Technologies</th>
//                             <th className="px-6 py-4 font-semibold uppercase text-sm">Links</th>
//                             <th className="px-6 py-4 font-semibold uppercase text-sm text-right">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-700">
//                         {projects.length > 0 ? (
//                             projects.map((project) => (
//                                 <tr key={project._id} className="hover:bg-gray-700/50">
//                                     <td className="px-6 py-4">
//                                         <img src={project.imageUrl} alt={project.title} className="w-24 h-14 object-cover rounded-md" />
//                                     </td>
//                                     <td className="px-6 py-4 max-w-sm">
//                                         <p className="font-bold text-lg">{project.title}</p>
//                                         {/* Description ko chota karke dikhayein */}
//                                         <p className="text-sm text-gray-400 truncate">{project.description}</p>
//                                     </td>
//                                     <td className="px-6 py-4 max-w-xs">
//                                         <div className="flex flex-wrap gap-2">
//                                             {project.technologies.map(tech => (
//                                                 <span key={tech} className="px-2.5 py-1 text-xs bg-gray-700 rounded-full">{tech}</span>
//                                             ))}
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         {/* Links ke liye icons */}
//                                         <div className="flex items-center gap-4">
//                                             <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub Code">
//                                                 <HiOutlineCode className="w-6 h-6 text-gray-400 hover:text-white" />
//                                             </a>
//                                             {project.liveUrl && (
//                                                 <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="Live Demo">
//                                                     <HiOutlineExternalLink className="w-6 h-6 text-gray-400 hover:text-white" />
//                                                 </a>
//                                             )}
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4 text-right">
//                                         {/* Actions ke liye icons */}
//                                         <div className="flex justify-end items-center gap-4">
//                                             <button className="p-2 rounded-full hover:bg-gray-700" title="Edit">
//                                                 <HiOutlinePencil className="w-5 h-5 text-blue-400" />
//                                             </button>
//                                             <button className="p-2 rounded-full hover:bg-gray-700" title="Delete">
//                                                 <HiOutlineTrash className="w-5 h-5 text-red-400" />
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={5} className="text-center py-10 text-gray-500">
//                                     No projects found. Add one to get started!
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ProjectsPage;


// In portfolio/src/app/admin/(protected)/projects/page.tsx
// In portfolio/src/app/admin/(protected)/projects/page.tsx

'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import Link from 'next/link';
import { HiOutlineExternalLink, HiOutlineCode, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

interface Project {
    _id: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    githubUrl: string;
    liveUrl?: string;
}

const ProjectsPage = () => {
    // --- All your State and Logic (useEffect, handleDelete) remains exactly the same ---
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get(`/projects`);
                setProjects(response.data);
            } catch (err) {
                setError('Failed to fetch projects.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleDelete = async (projectId: string) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            const token = localStorage.getItem('authToken');
            // await api.delete(`http://localhost:5000/api/projects/${projectId}`, {
            await api.delete(`/projects/${projectId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setProjects(projects.filter(p => p._id !== projectId));
        } catch (err) {
            alert('Failed to delete project.');
            console.error(err);
        }
    };

    if (loading) return <p className="text-center mt-8">Loading projects...</p>;
    if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

    // --- RESPONSIVE UI STARTS HERE ---
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Manage Projects</h1>
                <Link href="/admin/projects/add">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        + Add New Project
                    </button>
                </Link>
            </div>

            {/* --- DESKTOP VIEW: TABLE (hidden on small screens) --- */}
            <div className="hidden md:block bg-gray-800 rounded-lg shadow overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Title & Desc</th>
                            <th className="px-6 py-4">Technologies</th>
                            <th className="px-6 py-4">Links</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {projects.map((project) => (
                            <tr key={project._id} className="hover:bg-gray-700/50">
                                <td className="px-6 py-4"><img src={project.imageUrl} alt={project.title} className="w-24 h-14 object-cover rounded-md" /></td>
                                <td className="px-6 py-4 max-w-sm">
                                    <p className="font-bold text-lg">{project.title}</p>
                                    <p className="text-sm text-gray-400 truncate">{project.description}</p>
                                </td>
                                <td className="px-6 py-4 max-w-xs">
                                    <div className="flex flex-wrap gap-2">{project.technologies.map(tech => (<span key={tech} className="px-2.5 py-1 text-xs bg-gray-700 rounded-full">{tech}</span>))}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub Code"><HiOutlineCode className="w-6 h-6 text-gray-400 hover:text-white" /></a>
                                        {project.liveUrl && (<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="Live Demo"><HiOutlineExternalLink className="w-6 h-6 text-gray-400 hover:text-white" /></a>)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end items-center gap-4">
                                        <Link href={`/admin/projects/edit/${project._id}`} className="p-2 rounded-full hover:bg-gray-700" title="Edit"><HiOutlinePencil className="w-5 h-5 text-blue-400" /></Link>
                                        <button onClick={() => handleDelete(project._id)} className="p-2 rounded-full hover:bg-gray-700" title="Delete"><HiOutlineTrash className="w-5 h-5 text-red-400" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- MOBILE VIEW: CARDS (visible on small screens) --- */}
            <div className="md:hidden space-y-4">
                {projects.map((project) => (
                    <div key={project._id} className="bg-gray-800 rounded-lg shadow p-4 space-y-4">
                        <div className="flex gap-4">
                            <img src={project.imageUrl} alt={project.title} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{project.title}</h3>
                                <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 mb-2">Technologies:</p>
                            <div className="flex flex-wrap gap-2">{project.technologies.map(tech => (<span key={tech} className="px-2.5 py-1 text-xs bg-gray-700 rounded-full">{tech}</span>))}</div>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                            <div className="flex items-center gap-4">
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub Code"><HiOutlineCode className="w-6 h-6 text-gray-400 hover:text-white" /></a>
                                {project.liveUrl && (<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="Live Demo"><HiOutlineExternalLink className="w-6 h-6 text-gray-400 hover:text-white" /></a>)}
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href={`/admin/projects/edit/${project._id}`} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600" title="Edit"><HiOutlinePencil className="w-5 h-5 text-blue-400" /></Link>
                                <button onClick={() => handleDelete(project._id)} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600" title="Delete"><HiOutlineTrash className="w-5 h-5 text-red-400" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {projects.length === 0 && (
                <div className="text-center py-10 bg-gray-800 rounded-lg">
                    <p className="text-gray-500">No projects found. Add one to get started!</p>
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;