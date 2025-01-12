import { post } from "./request"

export const googleLogin = (token) => post(`http://localhost:3000/api/auth/google`, {token})