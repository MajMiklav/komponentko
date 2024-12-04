import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddComputer from '../src/components/AddComputer';
import axios from 'axios';

jest.mock('axios');

describe('AddComputer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('submits computer data correctly', async () => {
    // Mock successful API call
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    const onComputerAdded = jest.fn();
    render(<AddComputer onComputerAdded={onComputerAdded} />);

    // Query by label and input values
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Office PC' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'A computer for office work' } });

    fireEvent.click(screen.getByText('Add Computer'));

    // Wait for the mock function to be called
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Ensure API is called with the correct data
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/api/computers',
      { name: 'Office PC', description: 'A computer for office work' }
    );

    // Ensure onComputerAdded callback is called
    expect(onComputerAdded).toHaveBeenCalledTimes(1);
  });

  test('shows alert if name is missing', () => {
    // Mock window.alert
    window.alert = jest.fn();

    render(<AddComputer onComputerAdded={jest.fn()} />);

    // Only fill out the description
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'A computer for gaming' } });

    fireEvent.click(screen.getByText('Add Computer'));

    // Check if alert was called
    expect(window.alert).toHaveBeenCalledWith('Please provide a name for the computer.');
    expect(axios.post).not.toHaveBeenCalled();
  });
});
