import Client from "./Client"
import HealthInsurance from "./HealthInsurance"

export default interface User {
    id:string,
    login: string,
    password: string,
    email: string,
    active: boolean,
    role: string
    client : Client | undefined,
    planType : string,
    healthInsurance : HealthInsurance[],
    url : string
  }