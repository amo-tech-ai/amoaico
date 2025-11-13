import React from 'react';
import { AnimatedElement } from '../../animations/AnimatedElement';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, title, value, delay = 0 }) => {
    return (
        <AnimatedElement delay={delay}>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-sunai-orange/10 text-sunai-orange">
                        {icon}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">{title}</p>
                        <p className="text-2xl font-bold font-poppins text-sunai-blue">{value}</p>
                    </div>
                </div>
            </div>
        </AnimatedElement>
    );
};