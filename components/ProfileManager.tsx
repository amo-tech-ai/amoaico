import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../services/supabaseClient';
import { CheckCircleIcon } from '../assets/icons';

export const ProfileManager = () => {
    const { user } = useAuth();
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [fullName, setFullName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setFullName(user.fullName);
            setAvatarUrl(user.avatarUrl || null);
        }
    }, [user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setIsSaving(true);
        try {
            const { error } = await supabase.from('profiles').upsert({
                id: user.id,
                full_name: fullName,
                updated_at: new Date().toISOString(),
            });
            if (error) throw error;
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2500);
        } catch (error: any) {
            alert(`Error updating profile: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!user || !event.target.files || event.target.files.length === 0) {
            return;
        }
        setIsSaving(true);
        try {
            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`;
            
            let { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            // Get public URL and add a timestamp to bust the cache
            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
            const newAvatarUrl = `${data.publicUrl}?t=${new Date().getTime()}`;
            
            const { error: updateError } = await supabase.from('profiles').upsert({
                id: user.id,
                avatar_url: newAvatarUrl,
                updated_at: new Date().toISOString(),
            });
            if (updateError) throw updateError;
            
            setAvatarUrl(newAvatarUrl);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2500);

        } catch (error: any) {
            alert(`Error uploading avatar: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) return null;

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
            <h3 className="text-lg font-bold font-poppins text-[#00334F]">My Profile</h3>
            <form onSubmit={handleUpdateProfile} className="mt-4 space-y-4">
                <div className="flex items-center gap-4">
                    <img
                        src={avatarUrl || `https://i.pravatar.cc/150?u=${user.id}`}
                        alt="Avatar"
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                         <label htmlFor="avatar-upload" className={`text-sm font-medium text-white bg-[#00334F] hover:bg-opacity-90 px-3 py-1.5 rounded-md cursor-pointer ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            {isSaving ? 'Uploading...' : 'Upload'}
                        </label>
                        <input
                            id="avatar-upload"
                            type="file"
                            className="hidden"
                            onChange={handleAvatarUpload}
                            accept="image/png, image/jpeg, image/webp"
                            disabled={isSaving}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#F97316] focus:border-[#F97316] sm:text-sm"
                    />
                </div>
                <div>
                    <button type="submit" disabled={isSaving} className="w-full px-4 py-2 text-sm font-semibold text-white bg-[#F97316] rounded-lg hover:opacity-90 disabled:bg-gray-400">
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
                {showSuccess && (
                     <div className="flex items-center gap-2 text-green-600 text-sm font-medium mt-2 animate-fade-in">
                        <CheckCircleIcon className="w-5 h-5" />
                        <span>Profile updated successfully!</span>
                    </div>
                )}
            </form>
        </div>
    );
};
