'use client'
import { Toaster, toast } from 'sonner';

export const registerUser = async (userData, profileImage) => {
    try {
        console.log(userData, profileImage);


        const formData = new FormData();

        formData.append(
            "userData",
            new Blob([JSON.stringify(userData)], { type: "application/json" })
        );
        formData.append("profileImage", profileImage);
        const response = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            body: formData,
        });

        if (response.status === 201) {
            toast.success("Sucess!", {
                description: "Successfully registered!",
            });
        } else if (response.status === 400) {
            const errorData = await response.json();
            const errorArray = [];

            for (const fieldName in errorData) {
                const errorMessage = errorData[fieldName];
                errorArray.push({ fieldName, errorMessage });
            }
            toast.error("Error!", {
                description: errorData.message,
            });
            console.log(errorData);
        } else {
            console.log("Error: " + response.status);
        }
    } catch (error) {
        console.log("Error: ", error);
    }
};
