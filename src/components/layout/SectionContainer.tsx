
import React, { forwardRef } from 'react';

interface SectionContainerProps {
    children?: React.ReactNode;
    className?: string;
    id?: string;
    contained?: boolean;
}

export const SectionContainer = forwardRef<HTMLElement, SectionContainerProps>(({ children, className = '', id = '', contained = true }, ref) => {
    const content = <>{children}</>;
    return (
        <section id={id} ref={ref} className={`w-full py-20 md:py-28 overflow-hidden ${className}`}>
            {contained ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {content}
                </div>
            ) : content}
        </section>
    );
});
SectionContainer.displayName = 'SectionContainer';