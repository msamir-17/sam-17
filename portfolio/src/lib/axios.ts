
import axios from 'axios';

// 1. Get the main URL from environment variables, with a fallback for local development.
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// 2. Create an axios instance where the baseURL is ALWAYS .../api
const api = axios.create({
    baseURL: `${API_URL}/api`,
});

export default api;