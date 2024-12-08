import React, { useState } from 'react';
import ComputerList from './components/ComputerList';
import ComputerComponents from './components/ComputerComponents';
import AddComponent from './components/AddComponent';
import AddComputer from './components/AddComputer';
import ShopList from './components/ShopList'; // Import ShopList
import { AppBar, Toolbar, Button, Typography, Container, Box } from '@mui/material';

function App() {
    const [currentView, setCurrentView] = useState('home'); // Default view
    const [selectedComputer, setSelectedComputer] = useState(null); // Selected computer

    // Function to navigate between views
    const handleNavigation = (view) => {
        setCurrentView(view);
    };

    return (
        <div>
            {/* Navigation Bar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Computer Manager
                    </Typography>
                    <Button color="inherit" onClick={() => handleNavigation('home')}>
                        Home
                    </Button>
                    <Button color="inherit" onClick={() => handleNavigation('viewComputers')}>
                        View Computers
                    </Button>
                    <Button color="inherit" onClick={() => handleNavigation('addComputer')}>
                        Add Computer
                    </Button>
                    <Button color="inherit" onClick={() => handleNavigation('viewShops')}>
                        View Shops
                    </Button> {/* New Button for Shops */}
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container sx={{ mt: 4 }}>
                {/* Home Page */}
                {currentView === 'home' && (
                    <Box textAlign="center">
                        <Typography variant="h4" gutterBottom>
                            Welcome to the Computer Manager
                        </Typography>
                        <Typography variant="body1">
                            Manage your computers and their components efficiently.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                            onClick={() => handleNavigation('viewComputers')}
                        >
                            Get Started
                        </Button>
                    </Box>
                )}

                {/* View Computers */}
                {currentView === 'viewComputers' && (
                    <ComputerList
                        onSelectComputer={(id, name) => {
                            setSelectedComputer({ id, name }); // Set selected computer
                            handleNavigation('viewComponents');
                        }}
                    />
                )}

                {/* View Components */}
                {currentView === 'viewComponents' && selectedComputer && (
                    <Box>
                        <Button
                            variant="outlined"
                            sx={{ mb: 2 }}
                            onClick={() => handleNavigation('viewComputers')}
                        >
                            Back to Computers
                        </Button>
                        <ComputerComponents
                            computerId={selectedComputer.id}
                            computerName={selectedComputer.name} // Pass computer name
                            onAddComponent={() => handleNavigation('addComponent')}
                        />
                    </Box>
                )}

                {/* Add Component */}
                {currentView === 'addComponent' && selectedComputer && (
                    <Box>
                        <Button
                            variant="outlined"
                            sx={{ mb: 2 }}
                            onClick={() => handleNavigation('viewComponents')}
                        >
                            Back to Components
                        </Button>
                        <AddComponent
                            computerId={selectedComputer.id}
                            onComponentAdded={() => handleNavigation('viewComponents')}
                        />
                    </Box>
                )}

                {/* Add Computer */}
                {currentView === 'addComputer' && (
                    <Box>
                        <Button
                            variant="outlined"
                            sx={{ mb: 2 }}
                            onClick={() => handleNavigation('viewComputers')}
                        >
                            Back to Computers
                        </Button>
                        <AddComputer onComputerAdded={() => handleNavigation('viewComputers')} />
                    </Box>
                )}

                {/* View Shops */}
                {currentView === 'viewShops' && <ShopList />} {/* Render ShopList ab*/}
            </Container>
        </div>
    );
}

export default App;
