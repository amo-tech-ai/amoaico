import React from 'react';
import { Link } from 'react-router-dom';
import { Brief } from '../../../types';
import { FileTextIcon } from '../../../assets/icons';

const ActivityItem = ({ brief }: { brief: Brief }) => {
    return (
        <Link to={`/dashboard/briefs/${brief.id}`} className="block p-4 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-sunai-blue/10 text-sunai-blue">
                    <FileTextIcon className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                    <p className="font-semibold text-sm text-sunai-slate">
                        New brief created for <span className="font-bold">{brief.company_name}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                        {new Date(brief.created_at).toLocaleString()}
                    </p>
                </div>
                <span className="text-xs font-medium text-gray-500 hidden sm:block">{brief.status.replace('-', ' ')}</span>
            </div>
        </Link>
    );
};

export const ActivityFeed = ({ briefs }: { briefs: Brief[] }) => {
    if (briefs.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <FileTextIcon className="w-8 h-8 mx-auto text-gray-400" />
                <h3 className="mt-4 font-semibold text-sunai-blue">No Recent Activity</h3>
                <p className="mt-1 text-sm text-gray-500">When you create a new brief, it will show up here.</p>
            </div>
        );
    }
    
    return (
        <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
            <div className="space-y-1">
                {briefs.map(brief => (
                    <ActivityItem key={brief.id} brief={brief} />
                ))}
            </div>
        </div>
    );
};