import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ComponentList from '../src/components/ComponentList';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
jest.mock('axios');

describe('ComponentList', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders component list and average price', async () => {
        // Mock data for components and average price
        const mockComponents = [
            { name: 'GPU', description: 'High-end GPU', price: 1500, user_name: 'John Doe' },
            { name: 'CPU', description: 'Powerful CPU', price: 300, user_name: 'Jane Doe' },
        ];
        const mockAveragePrice = { averagePrice: 900 };

        // Mock API responses
        axios.get.mockImplementation((url) => {
            if (url === `${API_BASE_URL}/api/components`) {
                return Promise.resolve({ data: mockComponents });
            }
            if (url === `${API_BASE_URL}/api/components/average-price`) {
                return Promise.resolve({ data: mockAveragePrice });
            }
            return Promise.reject(new Error('Unknown URL'));
        });

        // Render the component
        render(<ComponentList />);

        // Wait for the component list to appear
        await waitFor(() => expect(screen.getByText('Component List')).toBeInTheDocument());

        // Check if average price is displayed
        expect(screen.getByText('Average Price: $900.00')).toBeInTheDocument();

        // Check if components are rendered
        expect(screen.getByText('GPU - High-end GPU - $1500 (User: John Doe)')).toBeInTheDocument();
        expect(screen.getByText('CPU - Powerful CPU - $300 (User: Jane Doe)')).toBeInTheDocument();

        // Ensure axios calls were made
        expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/api/components`);
        expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/api/components/average-price`);
    });

    test('handles errors gracefully', async () => {
        // Mock API error responses
        axios.get.mockRejectedValue(new Error('API error'));

        // Render the component
        render(<ComponentList />);

        // Wait for the component to finish loading
        await waitFor(() => expect(screen.getByText('Component List')).toBeInTheDocument());

        // Ensure axios calls were made
        expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/api/components`);
        expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/api/components/average-price`);

        // Since there are no components, the list should be empty
        expect(screen.queryByText(/- \$/)).not.toBeInTheDocument();
    });
});