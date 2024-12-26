import {post} from "./request"

export const SignUp = (data)=>post("http://localhost:3000/api/auth/register",data)