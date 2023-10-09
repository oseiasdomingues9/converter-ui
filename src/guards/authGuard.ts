import AuthService from "../services/AuthService"

export function authGuard(to, from, next) {
    if(localStorage.getItem("authenticated")){
        next("/conversor") 
    }else{
        next()
    }


    /*if(localStorage.getItem('token')){
        AuthService.validate()
        .then((data) => {
            if (!data) next()   
            else next('/conversor')
        }).catch(() => {
            next()       
        })
    }else{
        next()       
    }*/
  }