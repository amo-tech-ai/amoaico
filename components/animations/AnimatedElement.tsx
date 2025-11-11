
import React, { useRef } from 'react';
import { useOnScreen } from '../../hooks/useOnScreen';

interface AnimatedElementProps {
    children?: React.ReactNode;
    className?: string;
    delay?: number;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className = '', delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const onScreen = useOnScreen(ref, { threshold: 0.1, triggerOnce: true });
    return (
        <div ref={ref} className={`${className} transition-all duration-700 ease-out ${onScreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};
