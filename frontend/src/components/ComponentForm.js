import React, { useState } from 'react';
import axios from 'axios';

const ComponentForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [userName, setUserName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComponent = { name, description, price: parseFloat(price), user_name: userName };

        try {
            const response = await axios.post('http://localhost:5000/api/components', newComponent);
            console.log('Component added:', response.data);
            setName('');
            setDescription('');
            setPrice('');
            setUserName('');
        } catch (error) {
            console.error('Error adding component:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button type="submit">Add Component</button>
        </form>
    );
};

export default ComponentForm;
