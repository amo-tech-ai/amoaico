import React from 'react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { AnimatedElement } from '../../components/animations/AnimatedElement';
import { IntegrationCard } from '../../components/dashboard/IntegrationCard';
import { StripeIcon, SlackIcon } from '../../assets/icons';

const availableIntegrations = [
    {
        name: 'Stripe',
        description: 'Connect your Stripe account to manage payments and subscriptions directly from your dashboard.',
        icon: <StripeIcon className="w-8 h-8 text-[#635BFF]" />,
        isConnected: false,
    },
    {
        name: 'Slack',
        description: 'Receive real-time notifications about new briefs, project updates, and client messages in your Slack workspace.',
        icon: <SlackIcon className="w-8 h-8" />,
        isConnected: true,
    },
];

export const IntegrationsPage = () => {
    return (
        <SectionContainer className="pt-8 md:pt-12">
            <AnimatedElement>
                <h1 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate tracking-tighter">
                    App Integrations
                </h1>
                <p className="mt-1 text-lg text-sunai-slate/80">
                    Connect your favorite tools to streamline your workflow.
                </p>
            </AnimatedElement>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {availableIntegrations.map((integration, index) => (
                    <AnimatedElement key={integration.name} delay={100 * index}>
                        <IntegrationCard {...integration} />
                    </AnimatedElement>
                ))}
            </div>
        </SectionContainer>
    );
};