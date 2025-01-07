import { post } from "./request"

export const resetPassword = (newPassword, token) => post(`http://localhost:3000/api/auth/reset-password/${token}`, { newPassword })
