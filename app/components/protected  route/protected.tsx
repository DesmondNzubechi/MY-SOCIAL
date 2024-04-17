import { userAuth } from "../auths/auth";
import Login from "@/app/login/page";


export const ProtectedRoute = () => {
    const user = userAuth();

    if (!user) {
        return <Login />
    }
}