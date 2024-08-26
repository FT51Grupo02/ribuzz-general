'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { IUserSession, ILoginProps, IRegisterProps } from "@/interfaces/Types";
import { login as authLogin, register as authRegister } from "@/helpers/auth.helper";

export interface AuthContextProps {
    user: IUserSession['user'] | null;
    token: string | null;
    setUser: (user: IUserSession['user'] | null) => void;
    setToken: (token: string | null) => void;
    login: (loginData: ILoginProps) => Promise<boolean>;
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
        if (token) {
            console.log('Guardando token en localStorage:', token);
            localStorage.setItem('authToken', token);
        }
    }, [token]);

    useEffect(() => {
        console.log('Montando AuthProvider');
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            console.log('Recuperado del localStorage:', storedToken);
            setToken(storedToken);
        }
    }, []);

    const login = async (loginData: ILoginProps): Promise<boolean> => {
        try {
            const sessionData = await authLogin(loginData);
            console.log('Datos de sesión del login:', sessionData);
            setUser(sessionData.user);
            setToken(sessionData.token);
            return true;
        } catch (error) {
            console.error("Error en el login", error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
        // Eliminar el carrito asociado al token del local storage (revisarlo bien)
        const token = localStorage.getItem('authToken');
        if (token) {
            localStorage.removeItem(`cart_${token}`);
        }
    };

    const register = async (registerData: IRegisterProps) => {
        try {
            const sessionData = await authRegister(registerData);
            console.log('Datos de sesión del registro:', sessionData);
            setUser(sessionData.user);
            setToken(sessionData.token);
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

/*  // AuthProvider.tsx
'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { IUserSession, ILoginProps, IRegisterProps } from "@/interfaces/Types";
import { login as authLogin, register as authRegister } from "@/helpers/auth.helper";

export interface AuthContextProps {
    user: IUserSession['user'] | null;
    token: string | null;
    setUser: (user: IUserSession['user'] | null) => void;
    setToken: (token: string | null) => void;
    login: (loginData: ILoginProps) => Promise<boolean>;
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
            console.log('Guardando en localStorage:', { user, token });
            localStorage.setItem('userSession', JSON.stringify({ user, token }));
        }
    }, [user, token]);

    useEffect(() => {
        console.log('Montando AuthProvider');
        const storedUserSession = localStorage.getItem('userSession');
        if (storedUserSession) {
            const parsedData: IUserSession = JSON.parse(storedUserSession);
            console.log('Recuperado del localStorage:', parsedData);
            setUser(parsedData.user);
            setToken(parsedData.token);
        }
    }, []);

    const login = async (loginData: ILoginProps): Promise<boolean> => {
        try {
            const sessionData = await authLogin(loginData);
            console.log('Datos de sesión del login:', sessionData);
            setUser(sessionData.user);
            setToken(sessionData.token);
            return true;
        } catch (error) {
            console.error("Error en el login", error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('userSession');
    };

    const register = async (registerData: IRegisterProps) => {
        try {
            const sessionData = await authRegister(registerData);
            console.log('Datos de sesión del registro:', sessionData);
            setUser(sessionData.user);
            setToken(sessionData.token);
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
export const useAuth = () => useContext(AuthContext);  */