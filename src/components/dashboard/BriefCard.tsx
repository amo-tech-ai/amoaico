import React from 'react';
import { Link } from 'react-router-dom';
import { Brief } from '../../types';
import { AnimatedElement } from '../animations/AnimatedElement';
import { ClockIcon } from '../../assets/icons';

const statusDescriptions: { [key: string]: string } = {
    draft: 'This brief is a draft and has not been submitted yet.',
    submitted: 'This brief has been submitted to the Sunai team.',
    'in-review': 'Our team is currently reviewing your project brief.',
    approved: 'Congratulations! Your project has been approved.',
    rejected: 'This project was not approved. Please contact us for more details.',
};

export const BriefCard = ({ brief, index }: { brief: Brief; index: number }) => {
    const statusStyles: { [key: string]: string } = {
        submitted: 'bg-blue-100 text-blue-800',
        'in-review': 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        draft: 'bg-gray-100 text-gray-800',
    };

    return (
        <AnimatedElement delay={100 * index} className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 flex flex-col">
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold font-poppins text-sunai-blue text-lg">{brief.company_name}</h3>
                        <p className="text-sm text-gray-500">{brief.project_type}</p>
                    </div>
                    <div className="relative group">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyles[brief.status] || statusStyles.draft}`}>
                            {brief.status.replace('-', ' ')}
                        </span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded-md text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            {statusDescriptions[brief.status]}
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 line-clamp-2">{brief.overview}</p>
            </div>
            <div className="flex items-center justify-between mt-6 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                    <ClockIcon className="w-3.5 h-3.5" />
                    <span>{new Date(brief.created_at).toLocaleDateString()}</span>
                </div>
                <Link to={`/dashboard/briefs/${brief.id}`} className="font-semibold text-sunai-orange hover:text-orange-700">
                    View Brief →
                </Link>
            </div>
        </AnimatedElement>
    );
};