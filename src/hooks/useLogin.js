import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

    const login = async (email, password) => {
        setError(null); // Reset error state
        setIsLoading(true); // Set loading state

        try {
            // Validate input before making the API call
            if (!email || !password) {
                setError('Email and password are required.');
                setIsLoading(false);
                return;
            }

            console.log('Attempting login with:', { email, password }); // Debugging input

            const response = await fetch(`${API_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const json = await response.json();

            // Debug response status and body
            console.log('Response status:', response.status);
            console.log('Response body:', json);

            // Handle non-OK responses
            if (!response.ok) {
                setError(json.error || 'Failed to login. Please check your credentials.');
                setIsLoading(false);
                return;
            }

            // Save user data to localStorage
            localStorage.setItem('user', JSON.stringify(json));

            // Update global auth context
            dispatch({ type: 'LOGIN', payload: json });

            // Reset loading state
            setIsLoading(false);
        } catch (err) {
            // Handle network or unexpected errors
            console.error('Network or unexpected error:', err);
            setError('Something went wrong. Please try again.');
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};