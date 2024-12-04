import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ComponentList from '../src/components/ComponentList';

jest.mock('axios');

describe('ComponentList', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders a message when no components are available', async () => {
        // Mock API responses
        axios.get.mockImplementation((url) => {
            if (url === 'http://localhost:5000/api/components') {
                return Promise.resolve({ data: [] }); // Empty components list
            }
            if (url === 'http://localhost:5000/api/components/average-price') {
                return Promise.resolve({ data: { averagePrice: 0 } }); // Zero average price
            }
            return Promise.reject(new Error('Unknown URL'));
        });

        // Render the component
        render(<ComponentList />);

        // Wait for content to load and assert
        await waitFor(() => {
            expect(screen.getByText(/No components available/i)).toBeInTheDocument();
            expect(screen.getByText('Average Price: $0.00')).toBeInTheDocument();
        });
    });

    test('renders a list of components when data is available', async () => {
        // Mock API responses with components
        axios.get.mockImplementation((url) => {
            if (url === 'http://localhost:5000/api/components') {
                return Promise.resolve({
                    data: [
                        { name: 'GPU', description: 'High-end GPU', price: 1500, user_name: 'John' },
                        { name: 'CPU', description: 'Fast CPU', price: 300, user_name: 'Jane' },
                    ],
                });
            }
            if (url === 'http://localhost:5000/api/components/average-price') {
                return Promise.resolve({ data: { averagePrice: 900 } });
            }
            return Promise.reject(new Error('Unknown URL'));
        });

        // Render the component
        render(<ComponentList />);

        // Wait for content to load and assert
        await waitFor(() => {
            // Check for the components list
            expect(screen.getByText('GPU - High-end GPU - $1500 (User: John)')).toBeInTheDocument();
            expect(screen.getByText('CPU - Fast CPU - $300 (User: Jane)')).toBeInTheDocument();

            // Check the average price
            expect(screen.getByText('Average Price: $900.00')).toBeInTheDocument();
        });
    });
});
