import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ShopList from '../src/components/ShopList';

jest.mock('axios'); // Mock axios

test('ShopList renders correctly, handles loading, displays data, and shows error on failure', async () => {
    // Mock successful response
    const mockShops = [
        { _id: '1', name: 'Tech Haven', location: 'Downtown' },
        { _id: '2', name: 'Green Grocers', location: 'Uptown' },
    ];

    // 1. Test loading state
    axios.get.mockResolvedValueOnce({ data: [] }); // Mock empty response
    render(<ShopList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Verify loading state

    // 2. Test successful fetch
    axios.get.mockResolvedValueOnce({ data: mockShops });
    render(<ShopList />);

    // Wait for items to render
    await waitFor(() => expect(screen.getByText('Tech Haven')).toBeInTheDocument());
    expect(screen.getByText('Location: Downtown')).toBeInTheDocument();
    expect(screen.getByText('Green Grocers')).toBeInTheDocument();
    expect(screen.getByText('Location: Uptown')).toBeInTheDocument();

    // 3. Test error handling
    axios.get.mockRejectedValueOnce(new Error('API Error')); // Mock API error
    render(<ShopList />);

    await waitFor(() => expect(screen.getByText(/error fetching shops/i)).toBeInTheDocument());
});
