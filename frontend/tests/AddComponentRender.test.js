import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddComponent from '../src/components/AddComponent';

test('renders AddComponent form correctly', () => {
    // Render the AddComponent
    render(<AddComponent computerId="123" onComponentAdded={jest.fn()} />);

    // Check if all form fields and the button are rendered
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
    expect(screen.getByLabelText('User Name')).toBeInTheDocument();
    expect(screen.getByText('Add Component')).toBeInTheDocument();
});
