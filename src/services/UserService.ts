import UserCreate from "../models/UserCreate"
import AuthService from "./AuthService"
import axios from "./Axios"

let base = "/api/user"

export default{

    findAll(){
        return axios.get(base)
    },
    findById(id : string){
        return axios.get(base + "/" + id)
    },
    findRole(id : string | null){
        return axios.get(base + "/" + id + "/role")
    },
    findPlans(){
        return axios.get(base + "/plans")
    },
    create(userCreate : UserCreate){
        return axios.post(base,userCreate)
    },
    update(userCreate : UserCreate,id : number){
        return axios.put(base + "/" + id,userCreate)
    },
    disable(id : number){
        return axios.put(base + "/" + id + "/disable")
    },
    delete(id : number){
        return axios.delete(base + "/" + id)
    }

}