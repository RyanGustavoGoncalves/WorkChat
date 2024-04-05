'use client'
import { toast } from 'sonner';

interface UserData {
    name: string;
    username: string;
    email: string;
    password: string;
}

interface ErrorData {
    message: string;
    [fieldName: string]: string;
}


type ProfileImageState = string | null | undefined;

export const registerUser = async (userData: UserData, profileImage: ProfileImageState): Promise<void> => {
    try {
        console.log(userData);
        const formData = new FormData();
        formData.append("userData", JSON.stringify(userData));
        if (profileImage) {
            formData.append("profileImage", profileImage);
        }

        // Envia a requisição com o cabeçalho Content-Type correto
        const response = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            body: formData
        });

        // Manipula a resposta como antes
        if (response.ok) {
            toast.success('Successfully registered!');
        } else if (response.status === 403) {
            const errorData: ErrorData = await response.json();
            const errorArray: { fieldName: string, errorMessage: string }[] = [];
            for (const fieldName in errorData) {
                const errorMessage = errorData[fieldName];
                errorArray.push({ fieldName, errorMessage });
            }
            toast.error(errorData.message);
            console.log(errorData);
        } else {
            throw new Error("Error: " + response.status);
        }
    } catch (error) {
        console.log("Error: ", error);
        toast.error(error instanceof Error ? error.message : "An error occurred."); // Mensagem genérica para outros tipos de erro
    }
};