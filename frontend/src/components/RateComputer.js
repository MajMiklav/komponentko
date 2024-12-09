import React, { useState } from 'react';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const RateComputer = ({ computerId, onRatingUpdate }) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/computers/${computerId}/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Rating updated successfully!');
                onRatingUpdate(data.computer);
            } else {
                setMessage(data.message || 'Error updating rating');
            }
        } catch (err) {
            setMessage('Error updating rating');
        }
    };

    return (
        <div>
            <h3>Rate Computer</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Rating (1-5):
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RateComputer;
