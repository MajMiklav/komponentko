import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ShopList = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/api/shops`)
            .then((response) => {
                setShops(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching shops:', error);
                setError('Error fetching shops');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box>
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Shops
            </Typography>
            <List>
                {shops.map((shop) => (
                    <ListItem key={shop._id}>
                        <ListItemText
                            primary={shop.name}
                            secondary={`Location: ${shop.location}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ShopList;
