import { login } from "./loginService"
import { SignUp } from "./SignupService"
import { getAllTasks, deleteOneNote, updateImportanceOfNote, addNote, updateNote } from "./tasksServices"
import { changePassword, changeFullname, changeAvatar } from "./changeOfUserInfo"
import { getUserInfo } from "./getUserInfo"
import { forgotPassword } from "./forgotPassword"
import { resetPassword } from "./resetPassword"
import {googleLogin} from "./googleAuth"
export {
    login,
    SignUp,
    getAllTasks,
    deleteOneNote,
    updateImportanceOfNote,
    addNote,
    updateNote,
    changePassword,
    changeFullname,
    changeAvatar,
    getUserInfo,
    forgotPassword,
    resetPassword,
    googleLogin
}