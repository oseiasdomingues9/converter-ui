import AuthService from "../services/AuthService"

export function conversorGuard(to, from, next) {
    if(localStorage.getItem("authenticated")){
        next()
    }else{
        next('/login');        
    }
}