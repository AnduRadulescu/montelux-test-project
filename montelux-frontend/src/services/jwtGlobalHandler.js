import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://localhost:3000', // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle 401 errors globally
axiosInstance.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized error here
      console.error('Unauthorized: Redirecting to login...');
      window.location.href = '/'; // Redirect to the login page or another action
    }
    return Promise.reject(error); // Always return the error so it can be handled locally as well
  }
);

export default axiosInstance;