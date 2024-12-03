import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

const AddComputer = ({ onComputerAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleAddComputer = () => {
        if (!name) return alert('Please provide a name for the computer.');

        axios.post('http://localhost:5000/api/computers', { name, description })
            .then(() => {
                alert('Computer added successfully!');
                setName('');
                setDescription('');
                if (onComputerAdded) onComputerAdded();
            })
            .catch((error) => console.error('Error adding computer:', error));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                Add a New Computer
            </Typography>
            <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddComputer}
            >
                Add Computer
            </Button>
        </Box>
    );
};

export default AddComputer;
