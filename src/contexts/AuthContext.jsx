import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api';

const DEFAULT_VALUE = { 
    user: {},
    login: (email, password) => {},
    isUserLogged: false
}

export const AuthContext = createContext(DEFAULT_VALUE);

export function AuthContextProvider ({ children }) {
    const [user, setUser] = useState(DEFAULT_VALUE.user);

    const [isUserLogged, setIsUserLogged] = useState(DEFAULT_VALUE.isUserLogged);

    useEffect(() => {
        me();
    }, []);

    async function login (email, password) {
        try {
            const { data } = await api.post('/user/login', {
                email,
                password
            });

            const content = data.data;

            api.defaults.headers.common['Authorization'] = 'Bearer ' + content.token;

            localStorage.setItem('access_token', content.token);

            setUser(content.user);

            setIsUserLogged(true);

            return true;
        } catch ({ response }) {
            toast.error("Oops! Tivemos um problema ao realizar login. Verifique suas credenciais e tente novamente.");

            return false;
        }
    }

    async function logout () {
        localStorage.removeItem('access_token');

        setUser(null);

        setIsUserLogged(false);
    }

    async function me() {
        const access_token = localStorage.getItem('access_token');

        if (!access_token) {
            logout();

            return;
        }

        api.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;

        try {
            api.post('/user/me');

            setIsUserLogged(true);
        } catch (error) {
            logout();
        }
    }

    const contextValues = {
        user,
        isUserLogged,
        login,
        logout
    }

    return (
        <AuthContext.Provider
            value={contextValues}
        >
            { children }
        </AuthContext.Provider>
    );
} 