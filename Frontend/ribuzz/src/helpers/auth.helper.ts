import { ILoginProps, IUserSession } from "@/interfaces/Types";
import { IRegisterProps } from "@/interfaces/Types";


const APIURL = process.env.NEXT_PUBLIC_API_URL;

// Asegúrate de que el tipo de retorno sea IUserSession
export async function register(registerData: IRegisterProps): Promise<IUserSession> {
  try {
      const response = await fetch(`${APIURL}/users`, {
          method: 'POST',
          headers: {
              "Content-type": "application/json"
          },
          body: JSON.stringify(registerData)
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to register');
      }

      const data: IUserSession = await response.json(); // Asegúrate de que la respuesta coincida con IUserSession
      return data;
  } catch (error: any) {
      throw new Error(error);
  }
}



export async function login(userData: ILoginProps): Promise<IUserSession> {
  try {
    const response = await fetch(`${APIURL}/auth/signIn`, {
      method: 'POST',
       headers: {
        "Content-type": "application/json",
      }, 
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const sessionData: IUserSession = await response.json();
    return sessionData;
  } catch (error: any) {
    throw new Error(error);
  }
} 
