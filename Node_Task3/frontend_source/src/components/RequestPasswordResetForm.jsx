import React, { useState } from 'react';
import axios from 'axios';

const RequestPasswordResetForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://liginnodetask3.onrender.com//api/auth/request-password-reset', { email });
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response?.data || 'Error sending reset email');
        }
    };

    return (
        <div>
            <h2 className='text-xl font-bold m-10 text-center'>Request Password Reset</h2>
            <form className='text-center' onSubmit={handleSubmit}>
                <input className='p-3 ml-3'
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className='m-10 bg-green-300 p-3 border-2 border-gray-800 rounded-xl' type="submit">Send Reset Email</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RequestPasswordResetForm;