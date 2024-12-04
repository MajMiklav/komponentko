import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../src/components/Header'; // Adjust the import path as needed

describe('Header', () => {
    test('renders the header with the correct title', () => {
        const title = 'My App Header';
        
        // Render the Header component
        render(<Header title={title} />);
        
        // Check if the header title is displayed
        expect(screen.getByText(title)).toBeInTheDocument();
    });
});
