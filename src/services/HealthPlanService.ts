import axios from "./Axios"

let base = "/plans"

export default{

    findAll(){
        return axios.get(base)
    },
    findById(id : string){
        return axios.get(base + "/" + id)
    }

}