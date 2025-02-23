import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your backend URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor (optional)
instance.interceptors.request.use(
    (config) => {
        // You can add auth tokens here
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor (optional)
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors here
        return Promise.reject(error);
    }
);

export default instance; 