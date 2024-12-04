import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

test('navigates between views using AppBar buttons', () => {
    // Render the App component
    render(<App />);

    // Verify that the default view is the home view
    expect(screen.getByText('Welcome to the Computer Manager')).toBeInTheDocument();

    // Click on the "View Computers" button in the AppBar
    fireEvent.click(screen.getByText('View Computers'));

    // Check that the "ComputerList" view is rendered
    expect(screen.queryByText('Welcome to the Computer Manager')).not.toBeInTheDocument();

    // Click on the "Add Computer" button in the AppBar
    fireEvent.click(screen.getByText('Add Computer'));

    // Check that the "AddComputer" view is rendered
    expect(screen.getByText(/Back to Computers/i)).toBeInTheDocument();

    // Click on the "Home" button in the AppBar
    fireEvent.click(screen.getByText('Home'));

    // Verify that the default home view is displayed again
    expect(screen.getByText('Welcome to the Computer Manager')).toBeInTheDocument();
});
