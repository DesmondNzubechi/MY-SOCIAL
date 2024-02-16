import { userAuth } from "../auths/auth";
import Login from "@/app/login/page";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = () => {
    const user = userAuth();

    if (!user) {
        return <Login />
    }
}