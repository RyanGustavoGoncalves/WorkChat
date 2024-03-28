import React from 'react';
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

const FormAuth: React.FC = () => {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
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
                            <Input id="usernameOrEmail" defaultValue="" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" defaultValue="" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Login</Button>
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
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" defaultValue="" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue="" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" defaultValue="" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="profileImage">Profile image</Label>
                            <Input id="profileImage" type="file" defaultValue="" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Register</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
export default FormAuth;
