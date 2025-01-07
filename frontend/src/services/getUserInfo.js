import { get } from "./request"

export const getUserInfo = () => get("http://localhost:3000/api/auth/getall-userInfo");