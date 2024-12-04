import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App'; // Adjust the import path as needed

describe('App Component', () => {
    test('navigates to Add Computer view when the button is clicked', () => {
        // Render the App component
        render(<App />);

        // Click the "Add Computer" navigation button
        fireEvent.click(screen.getByText('Add Computer'));

        // Check for the presence of "Back to Computers" button in Add Computer view
        expect(screen.getByText('Back to Computers')).toBeInTheDocument();
    });
});
