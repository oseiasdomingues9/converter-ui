import AuthService from "../services/AuthService"

export function conversorGuard(to, from, next) {
    if(!localStorage.getItem('token')){
        next('/login');
    }else{
        AuthService.validate().then(() => {
            next()
        }).catch(() => {
            next('/login');        
        })
    }
}