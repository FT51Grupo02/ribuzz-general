import { IUser, IUserSession } from "@/interfaces/Types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

// Función para decodificar el token JWT manualmente
const decodeBase64Url = (str: string) => {
    // Convert Base64Url to Base64
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    // Decode Base64
    return atob(str);
};

const parseJwt = (token: string) => {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid JWT');
        }

        // Decode the payload (part 1 of the JWT)
        const payload = decodeBase64Url(parts[1]);
        return JSON.parse(payload);
    } catch (error) {
        console.error('Error al decodificar el token JWT:', error);
        throw new Error('Token JWT inválido');
    }
};

// Función para obtener todos los usuarios
const fetchUsers = async (): Promise<IUser[]> => {  
    try {
        const response = await fetch(`${APIURL}/users?page=1&limit=3`);
        if (!response.ok) {
            throw new Error('Error al recuperar los usuarios');
        }
        return await response.json();
    } catch (error) {
        console.error('Error en la solicitud de usuarios:', error);
        throw new Error('No se pudieron recuperar los usuarios');
    }
};

// Función para obtener el usuario autenticado
export const getAuthenticatedUser = async (token: string): Promise<IUser | null> => {
    try {
        const decodedToken: { id: string } = parseJwt(token);
        const users = await fetchUsers();

        // Encuentra el usuario que coincide con el ID del token
        const user = users.find(user => user.id === decodedToken.id);
        return user || null;
    } catch (error) {
        console.error('Error al obtener el usuario autenticado:', error);
        return null;
    }
};
