import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel, FormControl, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    })
});

const Login: React.FC = () => {
    const navigate = useNavigate();

    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const handleLogin = async (data: z.infer<typeof formSchema>) => {
        try {
            const response = await api.post('/login', { email: data.email, password: data.password });
            localStorage.setItem('token', response.data.accessToken);
            navigate('/home');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="example@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Login</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Login;
