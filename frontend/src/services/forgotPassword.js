import {post} from "./request"

export const forgotPassword = (email)=>post("http://localhost:3000/api/auth/forgot-password",{email})
