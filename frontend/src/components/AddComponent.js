import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

const AddComponent = ({ computerId, onComponentAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [userName, setUserName] = useState('');

    // Funkcija za dodajanje komponente
    const handleAddComponent = () => {
        if (!name || !description || !price || !userName) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        // Klic API-ja za dodajanje komponente
        axios.post(`http://localhost:5000/api/computers/${computerId}/components`, {
            name,
            description,
            price: parseFloat(price),
            user_name: userName,
        })
            .then(() => {
                alert('Component added successfully!');
                setName('');
                setDescription('');
                setPrice('');
                setUserName('');
                if (onComponentAdded) onComponentAdded(); // Preklopi nazaj na seznam komponent
            })
            .catch((error) => {
                console.error('Error adding component:', error);
                alert('Failed to add component. Please try again.');
            });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                Add a New Component
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
            <TextField
                label="Price"
                type="number"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
                label="User Name"
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddComponent}
            >
                Add Component
            </Button>
        </Box>
    );
};

export default AddComponent;
