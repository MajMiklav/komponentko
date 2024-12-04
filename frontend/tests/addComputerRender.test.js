import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddComputer from '../src/components/AddComputer';

test('renders AddComputer form correctly', () => {
    // Render the AddComputer component
    render(<AddComputer onComputerAdded={jest.fn()} />);

    // Check if all form fields and the button are rendered
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByText('Add Computer')).toBeInTheDocument();
});
