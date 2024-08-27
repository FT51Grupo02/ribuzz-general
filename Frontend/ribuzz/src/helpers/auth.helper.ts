import { /* ILoginProps,  */ILoginPropsEntrep, ILoginPropsUSer, IRegisterResponse, IUserSession } from "@/interfaces/Types";
import { IRegisterProps } from "@/interfaces/Types";


const APIURL = process.env.NEXT_PUBLIC_API_URL;


export async function register(registerData: IRegisterProps): Promise<IRegisterResponse> {
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

      const data: IRegisterResponse = await response.json();
      return data;
  } catch (error: any) {
      throw new Error(error.message);
  }
}


export async function loginUser(userData: ILoginPropsUSer): Promise<IUserSession> {
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

export async function loginEntrepreneur(userData: ILoginPropsEntrep): Promise<IUserSession> {
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
