import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, List, ListItem, ListItemText, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ComputerComponents = ({ computerId, computerName, onAddComponent }) => {
    const [components, setComponents] = useState([]); // Store components
    const [error, setError] = useState(null); // Handle errors

    // Fetch components from API
    useEffect(() => {
        axios.get(`http://localhost:5000/api/computers/${computerId}/components`)
            .then((response) => {
                setComponents(response.data);
                setError(null);
            })
            .catch((error) => {
                console.error('Error fetching components:', error);
                setError('Failed to fetch components. Please try again later.');
            });
    }, [computerId]);

    // Delete a component
    const deleteComponent = (componentId) => {
        axios.delete(`http://localhost:5000/api/computers/${computerId}/components/${componentId}`)
            .then(() => {
                // Remove the deleted component from state
                setComponents((prevComponents) => prevComponents.filter((comp) => comp._id !== componentId));
            })
            .catch((error) => {
                console.error('Error deleting component:', error);
                alert('Failed to delete component. Please try again later.');
            });
    };

    return (
        <Box>
            {/* Title */}
            <Typography variant="h5" gutterBottom>
                Components for {computerName}
            </Typography>

            {/* List of components */}
            {error ? (
                <Typography variant="body1" color="error">
                    {error}
                </Typography>
            ) : (
                <List>
                    {components.length > 0 ? (
                        components.map((component) => (
                            <ListItem key={component._id} secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => deleteComponent(component._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }>
                                <ListItemText
                                    primary={`${component.name} - $${component.price}`}
                                    secondary={`Description: ${component.description}, User: ${component.user_name}`}
                                />
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            No components found for this computer.
                        </Typography>
                    )}
                </List>
            )}

            {/* Add Component Button */}
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={onAddComponent}
            >
                Add Component
            </Button>
        </Box>
    );
};

export default ComputerComponents;
