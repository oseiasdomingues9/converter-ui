import axios from "axios"
import CryptoServices from "./CryptoServices";

const instance = axios.create({
   baseURL: 'http://localhost:8080',
})

instance.interceptors.request.use((req) => {
      if(!req.url?.includes('login')){
         req.headers.Authorization = `Bearer ` + CryptoServices.decrypted(localStorage.getItem("token"))
      }
      req.headers.Accept = 'application/json'
      req.headers["Content-Type"] = 'application/json'
      return req;
   },
   (error) => {
     return Promise.reject(error);
   }
 );


export default instance