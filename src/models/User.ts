import HealthInsurance from "./HealthInsurance"

export default interface User {
    id:string,
    login: string,
    email: string,
    active: boolean,
    role: string
    clientKey : string,
    plantType : string,
    healthInsurance : HealthInsurance[],
    url : string
  }