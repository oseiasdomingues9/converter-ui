import AuthService from "../services/AuthService"
import CryptoServices from "../services/CryptoServices";
import UserService from "../services/UserService";

export function controlGuard(to, from, next) {
    if(localStorage.getItem("authenticated")){
        if(localStorage.getItem("user")){
            UserService.findRole(CryptoServices.decrypted(localStorage.getItem("user")))
            .then((res : any) => {
                if(res.data.data == "ADMIN") next()
                else next("/converter")
            })
        }else next("/login") 
    }else next("/login")
    
}