import { post } from "./request"


export const login = (data) => post(`http://localhost:3000/api/auth/login`, data)