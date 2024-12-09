import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, List, ListItem, ListItemText, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const ComputerComponents = ({ computerId, computerName, onAddComponent }) => {
    const [components, setComponents] = useState([]);
    const [averagePriceForComputer, setAveragePriceForComputer] = useState(0);
    const [averagePriceForAll, setAveragePriceForAll] = useState(0);
    const [error, setError] = useState(null);

    // Fetch components from API
    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/computers/${computerId}/components`)
            .then((response) => setComponents(response.data))
            .catch((error) => {
                console.error('Error fetching components:', error);
                setError('Failed to fetch components. Please try again later.');
            });

            axios.get(`${API_BASE_URL}/api/computers/${computerId}/average-price`)
            .then((response) => {
                console.log('Average price for selected computer:', response.data);
                setAveragePriceForComputer(response.data.averagePrice || 0);
            })
            .catch((error) => console.error('Error fetching average price for computer:', error));

        // Fetch average price for all components
        axios.get(`${API_BASE_URL}/api/computers/average-price/all`)
            .then((response) => setAveragePriceForAll(response.data.averagePrice || 0))
            .catch((error) => console.error('Error fetching average price for all components:', error));
    }, [computerId]);

    // Delete a component
    const deleteComponent = (componentId) => {
        axios.delete(`${API_BASE_URL}/api/computers/${computerId}/components/${componentId}`)
            .then(() => {
                setComponents((prevComponents) =>
                    prevComponents.filter((comp) => comp._id !== componentId)
                );
            })
            .catch((error) => {
                console.error('Error deleting component:', error);
                alert('Failed to delete component. Please try again later.');
            });
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Components for {computerName}
            </Typography>

            {/* Display Average Prices */}
            <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                <strong>Average Price for Selected Computer:</strong> ${averagePriceForComputer.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Average Price for All Components:</strong> ${averagePriceForAll.toFixed(2)}
            </Typography>

            {/* List of Components */}
            {error ? (
                <Typography variant="body1" color="error">
                    {error}
                </Typography>
            ) : (
                <List>
                    {components.length > 0 ? (
                        components.map((component) => (
                            <ListItem
                                key={component._id}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => deleteComponent(component._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
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
