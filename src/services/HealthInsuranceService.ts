import axios from "./Axios"

let base = "/health-insurance"

export default{

    findAll(){
        return axios.get(base)
    },
    findById(id : string){
        return axios.get(base + "/" + id)
    }

}