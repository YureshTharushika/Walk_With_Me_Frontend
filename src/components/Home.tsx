import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import useAuth from '@/hooks/useAuth';
import api from '@/services/api';

interface Walk {
    id: number;
    name: string;
    date: string;
    time: string;
    route: string;
}

const Home: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [walks, setWalks] = useState<Walk[]>([]);
    
    useEffect(() => {
        const fetchWalks = async () => {
            try {
                const response = await api.get('/api/walks');
                // Extract walks from the $values property
                const fetchedWalks: Walk[] = response.data.$values;
                setWalks(fetchedWalks);
            } catch (error) {
                console.error('Failed to fetch walks', error);
            }
        };

        fetchWalks();
    }, []);
    
    const handleLogout = () => {
        logout();
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
                    {walks.map(walk => (
                        <Card key={walk.id}>
                            <CardHeader>
                                <CardTitle>{walk.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Date: {new Date(walk.date).toLocaleDateString()}</p>
                                <p>Time: {walk.time}</p>
                                <p>Route: {walk.route}</p>
                            </CardContent>
                        </Card>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Home;
