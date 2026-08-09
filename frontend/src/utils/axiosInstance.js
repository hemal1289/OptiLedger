import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const AccessToken = localStorage.getItem("token");
        if(AccessToken){
            config.headers.Authorization =`Bearer ${AccessToken}`;
        }
        return(config);
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    //Handle error globally
    (error) => {
        if(error.response){
            if(error.response.status === 401){
                //redirect to login page
                window.location.href="/login";
            }
            else if(error.response.status === 500){
                console.error("Server error. Please try again later.");
            }
            else if(error.code === "ECONNABORTED"){
                console.error("Request timeout. Please try again");
            }
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;