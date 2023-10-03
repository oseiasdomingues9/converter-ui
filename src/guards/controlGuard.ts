import AuthService from "../services/AuthService"

export function controlGuard(to, from, next) {
    if(!localStorage.getItem('token')){
        next('/conversor');
    }else{
        AuthService.validateAdmin().then((data) => {
            if (!data) next('/conversor') 
            else next()   
        }).catch(() => {
            next('/conversor');        
        })
    }
}