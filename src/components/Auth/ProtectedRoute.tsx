import { useAppSelector } from "@store/hooks"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { accessToken } = useAppSelector(state => state.authSlice);

    if(accessToken) {
        return <>{children}</>;
    }
    else {
        return <Navigate to={"/login"} />
    }
}

export default ProtectedRoute;