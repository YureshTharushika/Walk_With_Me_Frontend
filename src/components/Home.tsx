import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const handleCreateWalk = () => {
        navigate('/create-walk');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <header className="bg-black text-white py-4 shadow-md rounded-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-center w-full">Walk With Me</h1>
                    <Button onClick={handleLogout} className="bg-red-500 text-white">Logout</Button>
                </div>
            </header>
            <main className="mt-8 container mx-auto">
                <section className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Upcoming Walks</h2>
                    <Button onClick={handleCreateWalk} className="bg-black text-white shadow-md rounded-md">Create Walk</Button>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Replace this with actual walk data */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Park Loop</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Date: 2024-08-01</p>
                            <p>Time: 07:00 AM</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>River Walk</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Date: 2024-08-02</p>
                            <p>Time: 06:30 AM</p>
                        </CardContent>
                    </Card>
                    {/* End of walk data */}
                </section>
            </main>
        </div>
    );
};

export default Home;
