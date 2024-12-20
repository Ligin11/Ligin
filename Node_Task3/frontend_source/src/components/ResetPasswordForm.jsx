import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPasswordForm = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    console.log(token);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://nodetask3-t4to.onrender.com/api/auth/reset-password', { token, newPassword });
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response?.data || 'Error resetting password');
        }
    };

    return (
        <div>
            <h2 className='text-xl font-bold m-10 text-center'>Reset Password</h2>
            <form className='text-center' onSubmit={handleSubmit}>
                <input className='p-3 ml-3'
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button className='m-10 bg-green-300 p-3 border-2 border-gray-800 rounded-xl' type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPasswordForm;