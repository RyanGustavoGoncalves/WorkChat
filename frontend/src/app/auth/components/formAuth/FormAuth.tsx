'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Toaster } from 'sonner';
import { loginUser } from '../utils/loginUser/loginUser';
import { registerUser } from '../utils/registerUser/registerUser';

interface UserData {
    name: string;
    username: string;
    email: string;
    password: string;
}

interface loginData {
    username: string;
    password: string;
}

type ProfileImageState = string | null | undefined;

const FormAuth: React.FC = () => {
    const [profileImage, setProfileImage] = useState<ProfileImageState>(null);
    const [userData, setUserData] = useState<UserData>({
        name: "",
        username: "",
        email: "",
        password: ""
    });
    const [loginData, setLoginData] = useState<loginData>({
        username: "",
        password: ""
    });
    const handleRegisterUser = async () => {
        await registerUser(userData, profileImage);
    }
    const handleLoginUser = async () => {
        await loginUser(loginData);
    }
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <Toaster richColors position="top-right" />
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Login</TabsTrigger>
                <TabsTrigger value="password">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Log in here
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="usernameOrEmail">Username or Email</Label>
                            <Input id="usernameOrEmail"
                                value={loginData.username}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="text"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => handleLoginUser()}>Login</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            create your account here
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={userData.username}
                                onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={userData.name}
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password"
                                type="password"
                                value={userData.password}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="profileImage">Profile image</Label>
                            <Input
                                id="profileImage"
                                type="file"
                                onChange={(e) => setProfileImage(e.target.files[0])}
                            />

                        </div>
                        <div className="my-4">
                            <Button onClick={() => handleRegisterUser()}>Register</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
export default FormAuth;
