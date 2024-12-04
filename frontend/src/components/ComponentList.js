import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ComponentList = () => {
    const [components, setComponents] = useState([]);
    const [averagePrice, setAveragePrice] = useState(0);

    useEffect(() => {
        // Fetch all components
        axios.get('http://localhost:5000/api/components')
            .then((response) => setComponents(response.data))
            .catch((error) => console.error('Error fetching components:', error));

        // Fetch average price
        axios.get('http://localhost:5000/api/components/average-price')
            .then((response) => setAveragePrice(response.data.averagePrice || 0))
            .catch((error) => console.error('Error fetching average price:', error));
    }, []);

    return (
        <div>
            <h1>Component List</h1>
            <p>Average Price: ${averagePrice.toFixed(2)}</p>
            {components.length === 0 ? (
                <p>No components available.</p> // Add this message for clarity
            ) : (
                <ul>
                    {components.map((component, index) => (
                        <li key={index}>
                            {component.name} - {component.description} - ${component.price} (User: {component.user_name})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ComponentList;
