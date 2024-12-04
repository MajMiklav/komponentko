import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ComputerList from '../src/components/ComputerList';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('ComputerList', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockComputers = [
        {
            _id: '1',
            name: 'Computer 1',
            description: 'Description for Computer 1',
        },
        {
            _id: '2',
            name: 'Computer 2',
            description: 'Description for Computer 2',
        },
    ];

    test('fetches and displays computers', async () => {
        // Mock API response
        axios.get.mockResolvedValueOnce({ data: mockComputers });

        // Render the component
        render(<ComputerList onSelectComputer={jest.fn()} />);

        // Wait for the computers to be fetched and displayed
        await waitFor(() => {
            expect(screen.getByText('Computer 1')).toBeInTheDocument();
            expect(screen.getByText('Description for Computer 1')).toBeInTheDocument();
            expect(screen.getByText('Computer 2')).toBeInTheDocument();
            expect(screen.getByText('Description for Computer 2')).toBeInTheDocument();
        });

        // Ensure the API call was made
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/api/computers');
    });

    test('calls onSelectComputer when a computer is clicked', async () => {
        // Mock API response
        axios.get.mockResolvedValueOnce({ data: mockComputers });

        // Mock onSelectComputer function
        const onSelectComputer = jest.fn();

        // Render the component
        render(<ComputerList onSelectComputer={onSelectComputer} />);

        // Wait for the computers to be fetched and displayed
        await waitFor(() => {
            expect(screen.getByText('Computer 1')).toBeInTheDocument();
        });

        // Click on the first computer
        const firstComputer = screen.getByText('Computer 1');
        fireEvent.click(firstComputer);

        // Ensure onSelectComputer is called with correct arguments
        expect(onSelectComputer).toHaveBeenCalledWith('1', 'Computer 1');
    });

    test('handles API errors gracefully', async () => {
        // Mock API error
        axios.get.mockRejectedValueOnce(new Error('API error'));

        // Render the component
        render(<ComputerList onSelectComputer={jest.fn()} />);

        // Ensure the API call was made
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/api/computers');
        });

        // No computers should be displayed
        expect(screen.queryByText('Computer 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Computer 2')).not.toBeInTheDocument();
    });
});
