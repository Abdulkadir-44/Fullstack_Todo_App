import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { userLogout } from "../redux/userSlice"
import { jwtDecode } from "jwt-decode"
import Login from "../pages/authentication/Login"
import Register from "../pages/authentication/Register"
import { toast } from "sonner"
import PanelLayout from "../pages/Panel/PanelLayout"
import { Todos } from "../pages/Panel/Todos"
import Dashboard from "../pages/Panel/Dashboard"
import Calendar from "../pages/Panel/Calendar"
import StarTodos from "../pages/Panel/StarTodos"
import Profile from "../pages/Panel/Profile"

const AppRouter = () => {

    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch();
    let logoutTimer;

    const startLogoutTimer = (expiresIn) => {
        // Oturumun süresi dolunca otomatik olarak çıkış yap
        logoutTimer = setTimeout(() => {
            toast.warning("Your session has timed out !")
            dispatch(userLogout());
        }, expiresIn * 1000); // expiresIn saniye cinsinden olduğu için 1000 ile çarpılır
    };

    const clearLogoutTimer = () => {
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    };

    useEffect(() => {

        const token = user?.accesToken;
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            const expiresIn = decodedToken.exp - currentTime;
            startLogoutTimer(expiresIn);
        }

        return () => {
            clearLogoutTimer();
        };
    }, [user]);

    return (


        <Routes>
            {
                user ? (
                    <>
                        <Route path="/" element={<Navigate to="/panel" />} />
                        <Route path="/panel" element={<PanelLayout />}>
                            <Route index={true} element={<Todos />} />
                            <Route path="my-dashboard" element={<Dashboard />} />
                            <Route path="tasks-calendar" element={<Calendar />} />
                            <Route path="star-tasks" element={<StarTodos />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                    </>
                )
                    : (
                        <>
                            <Route path="/auth/login" element={<Login />} />
                            <Route path="/auth/sign-up" element={<Register />} />
                            <Route path="*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
            }
        </Routes>
    )
}

export default AppRouter