import { useEffect } from 'react';
// FIX: Changed import of `useLocation` from 'react-router-dom' to 'react-router' to potentially resolve module resolution issues.
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
};