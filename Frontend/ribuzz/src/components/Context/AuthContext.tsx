'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { IUser, ILoginProps, IRegisterProps } from "@/interfaces/Types";
import { login as authLogin, register as authRegister } from "@/helpers/auth.helper";
import { getAuthenticatedUser } from "@/helpers/user.helper";

export interface AuthContextProps {
    token: string | null;
    user: IUser | null;
    setToken: (token: string | null) => void;
    setUser: (user: IUser | null) => void;
    login: (loginData: ILoginProps) => Promise<boolean>;
    logout: () => void;
    register: (registerData: IRegisterProps) => Promise<string | null>;  // Devuelve solo el token en caso de éxito
}

export const AuthContext = createContext<AuthContextProps>({
    token: null,
    user: null,
    setToken: () => { throw new Error("setToken no inicializado"); },
    setUser: () => { throw new Error("setUser no inicializado"); },
    login: async () => { throw new Error("login no inicializado"); },
    logout: () => { throw new Error("logout no inicializado"); },
    register: async () => { throw new Error("register no inicializado"); },
});

export interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        if (token) {
            console.log('Guardando token en localStorage:', token);
            localStorage.setItem('authToken', token);
        }
    }, [token]);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                try {
                    const authenticatedUser = await getAuthenticatedUser(token);
                    console.log('Información del usuario autenticado:', authenticatedUser); 
                    setUser(authenticatedUser);
                } catch (error) {
                    console.error('Error al obtener el usuario autenticado:', error);
                }
            }
        };
        fetchUserData();
    }, [token]);

    const login = async (loginData: ILoginProps): Promise<boolean> => {
        try {
            const sessionData = await authLogin(loginData);
            console.log('Datos de sesión del login:', sessionData);
            setToken(sessionData.token);
            setUser(sessionData.user);  // Asegúrate de establecer el usuario aquí
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
        const token = localStorage.getItem('authToken');
        if (token) {
            localStorage.removeItem(`cart_${token}`);
        }
    };

    const register = async (registerData: IRegisterProps): Promise<string | null> => {
        try {
            const sessionData = await authRegister(registerData);
            console.log('Datos de sesión del registro:', sessionData);
            setToken(sessionData.token);
            setUser(sessionData.user);  // Asegúrate de establecer el usuario aquí
            return sessionData.token;  // Devuelve solo el token
        } catch (error) {
            console.error("Error en el registro", error);
            return null;  // Devuelve null en caso de error
        }
    };

    return (
        <AuthContext.Provider value={{ token, user, setToken, setUser, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);


/* 'use client';
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
    register: (registerData: IRegisterProps) => Promise<IUserSession | null>;
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

    const register = async (registerData: IRegisterProps): Promise<IUserSession | null> => {
        try {
            const sessionData = await authRegister(registerData);
            console.log('Datos de sesión del registro:', sessionData);
            setUser(sessionData.user);
            setToken(sessionData.token);
            return sessionData;  // Devuelve los datos de la sesión si todo salió bien
        } catch (error) {
            console.error("Error en el registro", error);
            return null;  // Devuelve null en caso de error
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, setUser, setToken, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

 */