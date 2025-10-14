
'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditCertificatePage = () => {

    const params = useParams();
    const id = params.id;

    const router = useRouter();

    const [title, settitle] = useState('');
    const [issuedBy, setIssuedBy] = useState('');
    const [category, setCategory] = useState('');
    const [duration, setDuration] = useState('');
    const [ dateEarned, setDateEarned ] = useState<Date | null>(null);

    const [certificatePreview, setCertificatePreview] = useState('');
    // const [certificateFile, setnewCertificateFile] = useState<File | null>(null); // Nayi certificate ke liye state
// Isse badlein
    const [newCertificateFile, setNewCertificateFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // // Ab Step 4 (useEffect) ka code yahan aayega... waali line ko isse replace karein

    useEffect(() => {
        // Agar ID nahi hai, toh kuch mat karo
        if (!id) return;
        console.log("Fetching Certificate data for ID:", id);

        const fetchCertificate = async () => {
            try {
                setLoading(true);
                // Backend se us ek Certificate ka data laao
                const response = await api.get(`http://localhost:5000/api/certificates/${id}`);

                console.log(response.data)

                // Backend se aaye data ko ek variable mein rakho
                const Data = response.data;

                // Saari states ko us data se update karo

                if(Data){
                settitle(Data.title);
                setIssuedBy(Data.issuedBy);

                // Agar category array hai toh use join karo, warna empty string rakho
                setCategory(Data.category);
                setDuration(Data.duration || ''); // Agar duration nahi hai, toh empty string
                setCertificatePreview(Data.certificateLink || '');; // certificate preview ke liye URL set karo
                }
                if (Data.dateEarned) {
                const parts = Data.dateEarned.split('/');
                // new Date(year, month - 1, day)
                const dateObject = new Date(parts[2], parts[1] - 1, parts[0]);
                setDateEarned(dateObject);
            }
            } catch (err) {
                setError('Failed to fetch Certificate data. Please try again.');
                console.error(err);
            } finally {
                setLoading(false); // Data fetch ho gaya (ya fail), ab loading band kar do
            }
        };

        fetchCertificate(); // Is function ko call karo

    }, [id]);
    // Yeh effect tabhi chalega jab 'id' ki value badlegi

    // useEffect ke baad yeh function add karein

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        
        formData.append('title', title);
        formData.append('issuedBy', issuedBy);
        formData.append('category', category);
        formData.append('duration', duration);
        
        // formData.append('certificateUrl', certificatePreview); // Purani certificate URL bhi bhejein
        
        // Sirf tabhi certificate add karo agar user ne nayi file select ki hai
        if (newCertificateFile) {
            formData.append('certificateFile', newCertificateFile); // Yahan 'certificateFile' hona chahiye
        }

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Authentication error. Please log in again.');
                return;
            }

            // Backend ke PUT endpoint par request bhejein
            await api.put(`http://localhost:5000/api/certificates/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            router.push('/admin/certificates'); // Update safal hone par wapas list par bhej do

        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update Certificate.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <p className="text-center mt-8">Loading Certificate data...</p>;
    }

    if (error) {
        return <p className="text-center mt-8 text-red-500">{error}</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Edit Certificate: <span className="text-blue-500">{title}</span></h1>

            {/* Hum yahan handleSubmit ko call karenge, jo hum agle step mein banayenge */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg">

                {/* title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-400">title</label>
                    <input type="text" id="title" value={title} onChange={(e) => settitle(e.target.value)} required className="input-field" />
                </div>

                {/* issuedBy */}
                <div>
                    <label htmlFor="issuedBy" className="block text-sm font-medium text-gray-400">issuedBy</label>
                    <textarea id="issuedBy" value={issuedBy} onChange={(e) => setIssuedBy(e.target.value)} required rows={4} className="input-field"></textarea>
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

                {/* category */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-400">category</label>
                    {/* <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="input-field" /> */}
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

                {/* certificate Upload */}
                <div>
                    <label htmlFor="certificate" className="block text-sm font-medium text-gray-400">Change Certificate certificate</label>
                    {/* Purani certificate ka preview dikhayein */}
                    {certificatePreview && (
                        <img src={certificatePreview} alt="Current Certificate certificate" className="w-40 h-24 object-cover rounded-md my-4" />
                    )}
                    <input
                        type="file"
                        id="certificate"
                        onChange={(e) => {
                            if (e.target.files) {
                                setNewCertificateFile(e.target.files[0]);
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
                        {loading ? 'Updating...' : 'Update Certificate'}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default EditCertificatePage;