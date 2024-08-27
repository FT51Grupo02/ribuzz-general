import IProduct from "./IProduct";


export interface ILoginProps {
    email: string;
    password: string;
}

export interface ILoginError {
    email?: string;
    password?: string;
}

export type UserRole = 'Entrepreneur' | 'Client' | 'Admin';

export interface IRegisterProps {
  name: string;
  email: string;
  password: string;
  date: Date;
  rol: UserRole; // El campo rol ahora acepta uno de los valores definidos en UserRole
}

/* export interface IRegisterProps {
    email: string;
    password: string;
    name: string;
    address: string;
    phone: string;
} */

export type IRegisterError = Partial<IRegisterProps>




/* export interface IUserSession {
    token: string;
    user: {
        id: string;
        correo: string;
        rol: string;
    };
} */

/* export interface IUserSession {
    id: string;
    correo: string;
    rol: string;
    iat: number;
    exp: number;
  } */

/* export interface IUser {
    id: string;
    name: string;
    email: string;
    date: string; // Cambiar a string si no usas `Date` en el frontend
    photo: string | null;
} */

    export interface IUserSession {
        token: string;  // Token JWT
        user: IUser;    // Usuario autenticado
    }
    
    // Definición de IUser
    export interface IUser {
        id: string;
        name: string;
        email: string;
        date: string;
        photo: string | null;
    }
/*  export interface IUserSession {
    token: string;
    user: {
        address: string;
        email: string;
        id: number;
        name: string;
        phone: string;
        role: string;
        orders: []
    }
} 
 */
export interface IOrder  {
    id: number;
    status: string;
    date: Date;
    products: IProduct[];
}

