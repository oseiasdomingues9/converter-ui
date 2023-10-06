import Client from "../models/Client"
import axios from "./Axios"

let base = "/client"

export default{

    findAll(){
        return axios.get(base)
    },
    findById(id : string){
        return axios.get(base + "/" + id)
    },
    findByKey(key : string){
        return axios.get(base + "/key/" + key)
    },
    create(client : Client){
        return axios.post(base,client)
    },
    update(client : Client,id : number){
        return axios.put(base + "/" + id,client)
    },
    disable(id : number){
        return axios.put(base + "/" + id + "/disable")
    },
    delete(id : number){
        return axios.delete(base + "/" + id)
    }
}