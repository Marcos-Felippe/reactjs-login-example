import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../services/api";

type SingIndata = {
    email: string;
    password: string;
}

type User = {
    id: string;
    name: string;
    email: string;
}

type AuthContextType = {
    authenticated: boolean;
    user: User | null;
    loading: boolean;
    login: (data: SingIndata) => Promise<void>;
    logout: () => void;
}


export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({children}: any) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");
        const recoveredToken = localStorage.getItem("token");

        if(recoveredUser) {
            setUser(JSON.parse(recoveredUser));
            api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;
        }

        setLoading(false);
    }, []);

    const login = async ({email, password}: SingIndata) => {

        const response = await createSession(email, password);

        const loggedUser = response.data.userInfo;
        const token = response.data.access_token;

        api.defaults.headers.Authorization = `Bearer ${token}`;

        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);

        setUser(loggedUser);
        navigate("/profile");
    }

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
