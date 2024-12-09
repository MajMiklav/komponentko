import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComponentList from '../src/components/ComponentList'; // Update the path if needed

test('renders default UI when no components are loaded', () => {
    // Render the ComponentList
    render(<ComponentList />);

    // Check if the header is displayed
    expect(screen.getByText('Component List')).toBeInTheDocument();

    // Check if the average price is displayed as 0 (default state)
    expect(screen.getByText(/Average Price: \$0.00/i)).toBeInTheDocument();

    // Check if the component list is empty (no components loaded)
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('list').childNodes).toHaveLength(0); // No list items
});