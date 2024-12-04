import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ComputerComponents from '../src/components/ComputerComponents';

jest.mock('axios');

describe('ComputerComponents', () => {
    test('renders correctly when no components are present', async () => {
        // Mock API responses
        axios.get.mockImplementation((url) => {
            if (url.includes('/components')) {
                return Promise.resolve({ data: [] }); // Empty components list
            }
            if (url.includes('/average-price')) {
                return Promise.resolve({ data: { averagePrice: 0 } }); // Zero average price
            }
            return Promise.reject(new Error('Unknown URL'));
        });

        // Render the component
        render(
            <ComputerComponents
                computerId="123"
                computerName="Test Computer"
                onAddComponent={jest.fn()}
            />
        );

        // Wait for the "No components" message and prices to be displayed
        await waitFor(() => {
            expect(screen.getByText(/No components found for this computer\./i)).toBeInTheDocument();
        });

        // Check that average prices are displayed correctly
        const selectedComputerAveragePrice = screen.getByText(/Average Price for Selected Computer:/i)
            .closest('p');
        expect(selectedComputerAveragePrice).toHaveTextContent('$0.00');

        const allComponentsAveragePrice = screen.getByText(/Average Price for All Components:/i)
            .closest('p');
        expect(allComponentsAveragePrice).toHaveTextContent('$0.00');
    });
});
