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
        console.log('Payload decodificado:', payload); 
        return JSON.parse(payload);
    } catch (error) {
        console.error('Error al decodificar el token JWT:', error);
        throw new Error('Token JWT inválido');
    }
};

// Función para obtener todos los usuarios
const fetchUsers = async (page: number = 1, limit: number = 100): Promise<IUser[]> => {  
    try {
        const response = await fetch(`${APIURL}/users?page=${page}&limit=${limit}`);
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
        console.log('ID decodificado:', decodedToken.id); 
        const users = await fetchUsers();
        console.log('Usuarios obtenidos:', users);
        // Encuentra el usuario que coincide con el ID del token
        const user = users.find(user => user.id === decodedToken.id); 
        return user || null;
    } catch (error) {
        console.error('Error al obtener el usuario autenticado:', error);
        return null;
    }
};


//Helper para actualizar informacion

// user.helper.ts
export const updateUserProfile = async (id: string, data: { name: string; email: string; password: string; date: string; rol?: string; }, token: string) => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Error al actualizar perfil');
    }

    return response.json();
};

/* export const updateUserProfilePhoto = async (id: string, photo: File, token: string) => {
    const formData = new FormData();
    formData.append('photo', photo);

    const response = await fetch(`http://localhost:3000/users/${id}/photo`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error('Error al actualizar foto de perfil');
    }

    return response.json();
}; */
