'use client';
import { toast, ToastType } from 'sonner';

interface LoginData {
    username: string;
    password: string;
}

interface ErrorData {
    message: string;
    [fieldName: string]: string; // Pode ter campos adicionais com string
}

export const loginUser = async (loginData: LoginData): Promise<void> => {
    try {
        console.log(loginData);
        
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json' // Definindo o Content-Type como application/json
            }
        });

        if (response.ok) {
            const requestBody = await response.json();
            toast.success('Successfully login!', requestBody);
        } else if (response.status === 403) {
            const errorData: ErrorData = await response.json()
            const errorArray: { fieldName: string, errorMessage: string }[] = [];
            for (const fieldName in errorData) {
                const errorMessage = errorData[fieldName];
                errorArray.push({ fieldName, errorMessage });
            }
            toast.error(errorData.message);
            console.log(errorData);
        } else {
            throw new Error("Error: " + response.json());
        }
    } catch (error) {
        console.log("Error: ", error);
        toast.error(error instanceof Error ? error.message : "An error occurred."); // Mensagem genérica para outros tipos de erro
    }
};