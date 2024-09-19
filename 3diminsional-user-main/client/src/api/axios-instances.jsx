import axios from 'axios'
import Cookies from 'js-cookie';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response=>response,
  async error=>{
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
   
      try {
        const { data } = await axios.post('http://localhost:3000/api/auth/refresh-token', {
          refreshToken: Cookies.get("refreshToken")
      
        });
      
        Cookies.set('accessToken', data.accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${data.data.accessToken}`;
        return axiosInstance(originalRequest);
    }  catch (refreshError) {
      console.error('Refresh token failed:', refreshError);
      
    }  
  }
}
)

export default axiosInstance