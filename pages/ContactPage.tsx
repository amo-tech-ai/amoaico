import React, { useState } from 'react';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { submitContactForm } from '../services/contactService';
import { CheckCircleIcon } from '../assets/icons';

export const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setError(null);
        try {
            await submitContactForm(formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus('error');
            setError("We couldn't send your message. Please try again later.");
            console.error(err);
        }
    };

    return (
        <main>
            <SectionContainer className="text-center">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-[#0F172A] tracking-tighter">
                        Let's Build Together
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-2xl mx-auto mt-6 text-lg text-[#0F172A]/80">
                        Have a project in mind or just want to learn more? We'd love to hear from you.
                    </p>
                </AnimatedElement>
            </SectionContainer>

            <SectionContainer className="max-w-3xl mx-auto">
                <AnimatedElement>
                    <div className="bg-white p-8 sm:p-12 rounded-2xl border border-gray-100 shadow-2xl">
                        {status === 'success' ? (
                            <div className="text-center py-12">
                                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto"/>
                                <h3 className="mt-4 text-2xl font-bold font-poppins text-[#00334F]">Message Sent!</h3>
                                <p className="mt-2 text-gray-600">Thanks for reaching out. We'll get back to you shortly.</p>
                                <button onClick={() => setStatus('idle')} className="mt-6 font-semibold text-[#F97316] hover:text-orange-700">Send another message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] transition" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] transition" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] transition"></textarea>
                                </div>
                                {status === 'error' && <p className="text-red-600 text-sm">{error}</p>}
                                <div className="text-right">
                                    <button type="submit" disabled={status === 'submitting'} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white transition-all disabled:bg-gray-400 transform hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F97316]">
                                        {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </AnimatedElement>
            </SectionContainer>
        </main>
    );
};