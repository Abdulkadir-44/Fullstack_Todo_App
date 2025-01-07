import { patch } from "./request"

export const changePassword = (data) => patch("http://localhost:3000/api/auth/change-password", data);
export const changeFullname = (data) => patch('http://localhost:3000/api/auth/change-fullname', data)
export const changeAvatar = (data) => patch("http://localhost:3000/api/auth/update-avatar", data)
