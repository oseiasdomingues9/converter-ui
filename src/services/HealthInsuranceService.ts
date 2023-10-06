import HealthInsurance from "../models/HealthInsurance"
import axios from "./Axios"

let base = "/health-insurance"

export default{

    findAll(){
        return axios.get(base)
    },
    findById(id : string){
        return axios.get(base + "/" + id)
    },
    create(healthInsurance : HealthInsurance){
        return axios.post(base,healthInsurance)
    },
    update(healthInsurance : HealthInsurance,id : number){
        return axios.put(base + "/" + id,healthInsurance)
    },
    delete(id : number){
        return axios.delete(base + "/" + id)
    }

}