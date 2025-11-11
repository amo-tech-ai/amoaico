import { supabase } from './supabaseClient';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

/**
 * Inserts a new contact form submission into the database.
 * @param formData - The user's name, email, and message.
 * @returns A promise that resolves when the submission is saved.
 */
export const submitContactForm = async (formData: ContactFormData): Promise<void> => {
    console.log("Submitting contact form to Supabase:", formData);
    const { error } = await supabase
        .from('contact_submissions')
        .insert([
            { 
                name: formData.name, 
                email: formData.email, 
                message: formData.message 
            }
        ]);
    
    if (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};
