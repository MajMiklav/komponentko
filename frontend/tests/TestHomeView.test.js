import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App'; // Adjust the import path as needed

describe('App Component', () => {
    test('renders the home view by default', () => {
        // Render the App component
        render(<App />);

        // Check for the home view title and button
        expect(screen.getByText('Welcome to the Computer Manager')).toBeInTheDocument();
        expect(screen.getByText('Manage your computers and their components efficiently.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Get Started' })).toBeInTheDocument();
    });
});