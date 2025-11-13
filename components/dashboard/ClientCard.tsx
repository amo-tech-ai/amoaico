import React from 'react';
import { Link } from 'react-router-dom';
import { Client } from '../../types';
import { AnimatedElement } from '../animations/AnimatedElement';
import { BuildingIcon } from '../../assets/icons';

interface ClientCardProps {
    client: Client;
    index: number;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client, index }) => {
    return (
        <AnimatedElement delay={100 * index}>
            <Link to="#" className="block border border-gray-200 rounded-xl p-6 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-sunai-blue/10 text-sunai-blue">
                        <BuildingIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold font-poppins text-sunai-blue text-lg">{client.company_name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {client.project_count} {client.project_count === 1 ? 'Project' : 'Projects'}
                        </p>
                    </div>
                </div>
            </Link>
        </AnimatedElement>
    );
};
