// import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../services';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userLogin } from "../redux/userSlice"
import { toast } from 'sonner';

const GoogleWithLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSucces = async (credentialResponse) => {

        try {
            const data = await googleLogin(credentialResponse.credential)
            console.log("saf cevap : ", data)
            dispatch(userLogin(data))
            navigate("/panel", { replace: true })
            toast.success(`Welcome to Noteflow ${data.userInfo.fullName}`)
        } catch (error) {
            toast.error(error || "Google ile oturum açmada hata oluştu !")
            console.log("ben googleWithLogin komponentindeki hata : ", error)
        }

    }

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>

            <GoogleLogin
                onSuccess={(credentialResponse) => handleSucces(credentialResponse)}
                onError={() => {
                    console.log('Login Failed');
                }}
            />

        </GoogleOAuthProvider>
    )
}

export default GoogleWithLogin