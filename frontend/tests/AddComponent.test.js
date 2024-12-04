import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddComponent from '../src/components/AddComponent';
import axios from 'axios';

jest.mock('axios');

describe('AddComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('submits form data correctly', async () => {
    // Mock successful API call
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    const onComponentAdded = jest.fn();
    render(<AddComponent computerId="123" onComponentAdded={onComponentAdded} />);

    // Query by label
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'GPU' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'High-end GPU' } });
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '1500' } });
    fireEvent.change(screen.getByLabelText('User Name'), { target: { value: 'John Doe' } });

    fireEvent.click(screen.getByText('Add Component'));

    // Wait for the mock function to be called
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Ensure API is called with the correct data
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/api/computers/123/components',
      {
        name: 'GPU',
        description: 'High-end GPU',
        price: 1500,
        user_name: 'John Doe',
      }
    );

    // Ensure onComponentAdded callback is called
    expect(onComponentAdded).toHaveBeenCalledTimes(1);
  });
});
