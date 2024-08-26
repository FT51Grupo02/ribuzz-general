'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { IUserSession, ILoginProps, IRegisterProps } from "@/interfaces/Types";
import { login as authLogin, register as authRegister } from "@/helpers/auth.helper";

// Actualización de AuthContextProps para usar IUserSession
export interface AuthContextProps {
    user: IUserSession['user'] | null;
    token: string | null;
    setUser: (user: IUserSession['user'] | null) => void;
    setToken: (token: string | null) => void;
    login: (loginData: ILoginProps) => Promise<void>;
    logout: () => void;
    register: (registerData: IRegisterProps) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    token: null,
    setUser: () => { throw new Error("setUser no inicializado"); },
    setToken: () => { throw new Error("setToken no inicializado"); },
    login: async () => { throw new Error("login no inicializado"); },
    logout: () => { throw new Error("logout no inicializado"); },
    register: async () => { throw new Error("register no inicializado"); },
});

export interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUserSession['user'] | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (user && token) {
            localStorage.setItem('userSession', JSON.stringify({ user, token }));
        }
    }, [user, token]);

    useEffect(() => {
        const storedUserSession = localStorage.getItem('userSession');
        if (storedUserSession) {
            const parsedData: IUserSession = JSON.parse(storedUserSession);
            setUser(parsedData.user);
            setToken(parsedData.token);
        }
    }, []);

    const login = async (loginData: ILoginProps) => {
        try {
            // Implementar la lógica de autenticación (ej. llamada a API)
            // Ejemplo ficticio:
            const response = await authLogin(loginData); 
            setUser(response.user);
            setToken(response.token);
        } catch (error) {
            console.error("Error en el login", error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('userSession');
    };

    const register = async (registerData: IRegisterProps) => {
        try {
            // Implementar la lógica de registro (ej. llamada a API)
            // Ejemplo ficticio:
            const response = await authRegister(registerData);
            setUser(response.user);
            setToken(response.token);
        } catch (error) {
            console.error("Error en el registro", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, setUser, setToken, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

/* // Ejemplos ficticios de las funciones fakeLoginAPI y fakeRegisterAPI:
const fakeLoginAPI = async (loginData: ILoginProps): Promise<IUserSession> => {
    // Simulación de respuesta de login
    return {
        token: "fake-token",
        user: {
            address: "123 Main St",
            email: loginData.email,
            id: 1,
            name: "John Doe",
            phone: "1234567890",
            role: "user",
            orders: []
        }
    };
};

const fakeRegisterAPI = async (registerData: IRegisterProps): Promise<IUserSession> => {
    // Simulación de respuesta de registro
    return {
        token: "fake-token",
        user: {
            address: registerData.address,
            email: registerData.email,
            id: 2,
            name: registerData.name,
            phone: registerData.phone,
            role: "user",
            orders: []
        }
    };
}; */