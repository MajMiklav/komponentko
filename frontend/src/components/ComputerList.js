import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const ComputerList = ({ onSelectComputer }) => {
    const [computers, setComputers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/computers')
            .then((response) => setComputers(response.data))
            .catch((error) => console.error('Error fetching computers:', error));
    }, []);

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Computers
            </Typography>
            <List>
                {computers.map((computer) => (
                    <ListItem
                        key={computer._id}
                        component="button" // Use 'component' instead of 'button'
                        onClick={() => onSelectComputer(computer._id, computer.name)}
                    >
                        <ListItemText
                            primary={computer.name}
                            secondary={computer.description}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ComputerList;
