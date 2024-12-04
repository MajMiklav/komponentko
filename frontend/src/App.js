import React, { useState } from 'react';
import ComputerList from './components/ComputerList';
import ComputerComponents from './components/ComputerComponents';
import AddComponent from './components/AddComponent';
import AddComputer from './components/AddComputer';
import { AppBar, Toolbar, Button, Typography, Container, Box } from '@mui/material';

function App() {
    const [currentView, setCurrentView] = useState('home'); // Privzeti pogled
    const [selectedComputer, setSelectedComputer] = useState(null); // Izbrani računalnik (ID in ime)

    // Funkcija za navigacijo med pogledi
    const handleNavigation = (view) => {
        setCurrentView(view);
    };

    return (
        <div>
            {/* Navigacijska vrstica */}
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
                </Toolbar>
            </AppBar>

            {/* Glavna vsebina */}
            <Container sx={{ mt: 4 }}>
                {/* Naslovna stran */}
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

                {/* Pregled računalnikov */}
                {currentView === 'viewComputers' && (
                    <ComputerList
                        onSelectComputer={(id, name) => {
                            setSelectedComputer({ id, name }); // Nastavimo ID in ime računalnika
                            handleNavigation('viewComponents');
                        }}
                    />
                )}

                {/* Pregled komponent računalnika */}
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
                            computerName={selectedComputer.name} // Posredujemo ime računalnika
                            onAddComponent={() => handleNavigation('addComponent')}
                        />
                    </Box>
                )}

                {/* Dodajanje komponent */}
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

                {/* Dodajanje računalnika */}
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
            </Container>
        </div>
    );
}

export default App;
