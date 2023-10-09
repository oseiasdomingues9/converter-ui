import axios from "./Axios"
import CryptoServices from "./CryptoServices"

let base = "/api/auth/"

export default{

    login(login : any, password : any){
        let data = {
            "login" : login,
            "password" : password
        }
        return axios.post(base + 'login',data)
    },
    refreshToken(){
        return axios.post(base + 'refresh-token')
        .catch(() => { 
            this.logout() 
            localStorage.removeItem("authenticated")
        })
    },

    logout(){
        return axios.get(base + 'logout',{headers:{"user" : CryptoServices.decrypted(localStorage.getItem("user"))}})
    },

    validate(){        
        return axios.get(base + 'validate')
        .catch(() => { return false});
    },

    validateAdmin(){        
        return axios.get(base + 'admin-validate')
        .catch(() => { return false});
    }
    
}