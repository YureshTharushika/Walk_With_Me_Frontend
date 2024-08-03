import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/services/api';

const CreateWalk: React.FC = () => {
    const [walkName, setWalkName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [route, setRoute] = useState('');
    const navigate = useNavigate();

    const handleCreateWalk = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const walkData = {
                Name: walkName,
                Date: new Date(date).toISOString(),
                Time: time + ":00",
                Route: route
            };

            await api.post('/api/walks', walkData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/home');
        } catch (error) {
            console.error('Failed to create walk', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
            <header className="bg-black text-white py-4 shadow-md rounded-md w-full mb-8">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-center w-full">Create Walk</h1>
                </div>
            </header>
            <form onSubmit={handleCreateWalk} className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="walkName" className="block text-gray-700 font-bold mb-2">Walk Name</label>
                    <Input
                        id="walkName"
                        type="text"
                        value={walkName}
                        onChange={(e) => setWalkName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
                    <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="time" className="block text-gray-700 font-bold mb-2">Time</label>
                    <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="route" className="block text-gray-700 font-bold mb-2">Route</label>
                    <Input
                        id="route"
                        type="text"
                        value={route}
                        onChange={(e) => setRoute(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="bg-black text-white w-full">Create Walk</Button>
            </form>
        </div>
    );
};

export default CreateWalk;
