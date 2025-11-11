import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../services/supabaseClient';
import { User } from '../types';

export const ProfileManager = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        try {
            const { error } = await supabase.from('profiles').upsert({
                id: user.id,
                full_name: fullName,
                updated_at: new Date().toISOString(),
            });
            if (error) throw error;
            alert('Profile updated successfully!');
            // You might want to refresh the auth context here or let it update automatically
        } catch (error: any) {
            alert(`Error updating profile: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!user || !event.target.files || event.target.files.length === 0) {
            return;
        }
        setLoading(true);
        try {
            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`;
            
            let { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            // Get public URL
            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
            const newAvatarUrl = data.publicUrl;
            
            // Update profile with new avatar URL
            const { error: updateError } = await supabase.from('profiles').upsert({
                id: user.id,
                avatar_url: newAvatarUrl,
                updated_at: new Date().toISOString(),
            });
            if (updateError) throw updateError;
            
            setAvatarUrl(newAvatarUrl);
            alert('Avatar updated!');

        } catch (error: any) {
            alert(`Error uploading avatar: ${error.message}`);
        } finally {
            setLoading(false);
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
                         <label htmlFor="avatar-upload" className="text-sm font-medium text-white bg-[#00334F] hover:bg-opacity-90 px-3 py-1.5 rounded-md cursor-pointer">
                            {loading ? 'Uploading...' : 'Upload'}
                        </label>
                        <input
                            id="avatar-upload"
                            type="file"
                            className="hidden"
                            onChange={handleAvatarUpload}
                            accept="image/png, image/jpeg, image/webp"
                            disabled={loading}
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
                    <button type="submit" disabled={loading} className="w-full px-4 py-2 text-sm font-semibold text-white bg-[#F97316] rounded-lg hover:opacity-90 disabled:bg-gray-400">
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};