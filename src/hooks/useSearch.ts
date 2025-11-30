import { useState, useEffect, useRef } from 'react';
import { useDebounce } from './useDebounce';
import { searchDashboard } from '../services/searchService';
import { SearchResults } from '../types';
import { useAuth } from './useAuth';

export const useSearch = () => {
    const { user } = useAuth();
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 300);
    const [results, setResults] = useState<SearchResults>({ briefs: [], projects: [] });
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!debouncedQuery || !user) {
            setResults({ briefs: [], projects: [] });
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            try {
                const data = await searchDashboard(debouncedQuery, user.id);
                setResults(data);
                setIsOpen(true);
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery, user]);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return { 
        query, 
        setQuery, 
        results, 
        loading, 
        isOpen, 
        setIsOpen, 
        containerRef 
    };
};