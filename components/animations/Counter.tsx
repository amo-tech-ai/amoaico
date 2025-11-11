
import React, { useState, useEffect, useRef } from 'react';
import { useOnScreen } from '../../hooks/useOnScreen';

export const Counter: React.FC<{
    endValue: number;
    duration?: number;
    decimals?: number;
}> = ({ endValue, duration = 2000, decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const onScreen = useOnScreen(ref);

    useEffect(() => {
        if (onScreen) {
            let startTime: number | null = null;
            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
                const currentCount = easedProgress * endValue;
                setCount(currentCount);
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setCount(endValue);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [onScreen, endValue, duration]);

    return <span ref={ref}>{count.toFixed(decimals)}</span>;
};
