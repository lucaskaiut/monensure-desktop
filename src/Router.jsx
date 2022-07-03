import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from './AuthRoutes';
import { useAuth } from "./hooks/useAuth";

export function Router () {
    const { isUserLogged } = useAuth();

    return (
        <BrowserRouter>
            {
                isUserLogged
                ? <AppRoutes />
                : <AuthRoutes />
            }
        </BrowserRouter>
    );
}