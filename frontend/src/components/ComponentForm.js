import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ComponentForm from '../components/ComponentForm';

import axios from 'axios';

jest.mock('axios');
global.alert = jest.fn();

test('does not submit when fields are empty', async () => {
    render(<ComponentForm />);

    const submitButton = screen.getByText('Add Component');
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(axios.post).not.toHaveBeenCalled();
        expect(global.alert).toHaveBeenCalledWith('Please fill out all fields before submitting.');
    });
});

test('submits form data when fields are filled', async () => {
    render(<ComponentForm />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'GPU' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'High-end GPU' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '1500' } });
    fireEvent.change(screen.getByPlaceholderText('User Name'), { target: { value: 'John Doe' } });

    const submitButton = screen.getByText('Add Component');
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/components', {
            name: 'GPU',
            description: 'High-end GPU',
            price: 1500,
            user_name: 'John Doe',
        });
    });
});
