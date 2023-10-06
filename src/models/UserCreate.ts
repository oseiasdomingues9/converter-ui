
export default interface User {
    login: string,
    password: string,
    email: string,
    role: string,
    active: boolean,
    clientKey : string,
    planType : string,
    url : string
}