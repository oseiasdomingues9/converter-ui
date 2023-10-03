import axios from "./Axios"

let base = "/auth/"

export default{

    login(login : any, password : any){
        let data = {
            "login" : login,
            "password" : password
        }
        return axios.post(base + 'login',data)
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