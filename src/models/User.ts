import HealthPlan from "./HealthPlan"

export default interface User {
    id:string,
    login: string,
    email: string,
    active: boolean,
    role: string
    clientKey : string,
    plantType : string,
    healthPlan : HealthPlan[],
    url : string
  }