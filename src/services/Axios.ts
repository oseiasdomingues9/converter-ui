import axios from "axios"
import CryptoServices from "./CryptoServices";
import AuthService from "./AuthService";

const instance = axios.create({
   baseURL: 'http://127.0.0.1:8080', 
   withCredentials : true
})

instance.interceptors.request.use((req) => {
      req.headers.Accept = 'application/json'
      req.headers["Content-Type"] = 'application/json'
      return req;
   },
   (error) => {
     return Promise.reject(error);
   }
 );

 instance.interceptors.response.use((res) => {
   return res;
},
    async (error) => {
   const originalRequest = error.config;
   if (error.response) {
      console.log(error.response.data);
    } else if (error.request && !originalRequest._retry) {
      originalRequest._retry = true;
      await AuthService.refreshToken();
      return instance(originalRequest)
    } else {
       console.log('Error', error.message);
    }

   return Promise.reject(error);
}
);

export default instance