import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getClientsForUser } from '../../services/clientService';
import { Client } from '../../types';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { AnimatedElement } from '../../components/animations/AnimatedElement';
import { ClientCard } from '../../components/dashboard/ClientCard';
import { UsersIcon, XIcon } from '../../assets/icons';

export const ClientsListPage = () => {
    const { user } = useAuth();
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const data = await getClientsForUser(user.id);
                setClients(data);
            } catch (err) {
                console.error("Failed to fetch clients:", err);
                setError("Could not load your clients. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, [user]);

    return (
        <SectionContainer className="pt-8 md:pt-12">
            <AnimatedElement>
                <h1 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate tracking-tighter">
                    My Clients
                </h1>
                 <p className="mt-1 text-lg text-sunai-slate/80">
                    A list of all companies you've created project briefs for.
                </p>
            </AnimatedElement>
            
            <div className="mt-8">
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl p-6 bg-white animate-pulse">
                                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4 mt-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <AnimatedElement className="text-center py-16 border-2 border-dashed border-red-300 rounded-2xl bg-red-50/50">
                        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                            <XIcon className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold font-poppins text-red-800">Something Went Wrong</h2>
                        <p className="mt-2 text-red-700">{error}</p>
                    </AnimatedElement>
                ) : clients.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {clients.map((client, index) => (
                            <ClientCard key={client.company_name} client={client} index={index} />
                        ))}
                    </div>
                ) : (
                    <AnimatedElement className="text-center py-16 border-2 border-dashed border-gray-300 rounded-2xl">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                            <UsersIcon className="w-8 h-8 text-gray-500" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold font-poppins text-sunai-blue">No Clients Found</h2>
                        <p className="mt-2 text-gray-600">When you create a project brief, the company will appear here as a client.</p>
                    </AnimatedElement>
                )}
            </div>
        </SectionContainer>
    );
};