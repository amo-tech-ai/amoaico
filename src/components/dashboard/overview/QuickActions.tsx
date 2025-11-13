import React from 'react';
// FIX: Changed import of `Link` from 'react-router-dom' to 'react-router' to potentially resolve module resolution issues.
import { Link } from 'react-router-dom';
import { PlusCircleIcon, RocketIcon } from '../../../assets/icons';

interface QuickActionsProps {
    onStartWizard: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onStartWizard }) => {
    return (
        <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-sunai-blue">Start a New Project</h3>
                <p className="text-sm text-gray-500 mt-1">Use our AI-powered wizard to scope your project in minutes.</p>
                <button 
                    onClick={onStartWizard} 
                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm bg-sunai-orange text-white transition-transform transform hover:scale-105"
                >
                    <PlusCircleIcon className="w-5 h-5" />
                    Create New Brief
                </button>
            </div>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-sunai-blue">Manage Projects</h3>
                <p className="text-sm text-gray-500 mt-1">View the status of your active and completed projects.</p>
                <Link 
                    to="/dashboard/projects"
                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm bg-sunai-blue text-white transition-transform transform hover:scale-105"
                >
                    <RocketIcon className="w-5 h-5" strokeWidth="2" />
                    View All Projects
                </Link>
            </div>
        </div>
    );
};