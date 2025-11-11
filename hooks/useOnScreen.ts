
import { useState, useEffect, RefObject } from 'react';

export const useOnScreen = (ref: RefObject<HTMLElement>, options: IntersectionObserverInit & { triggerOnce?: boolean } = {}) => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;
        
        const { triggerOnce, ...observerOptions } = options;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIntersecting(true);
                if (triggerOnce) {
                    observer.unobserve(currentRef);
                }
            }
        }, observerOptions);
        observer.observe(currentRef);
        return () => { if(currentRef) observer.unobserve(currentRef) };
    }, [ref, options]);
    return isIntersecting;
};
