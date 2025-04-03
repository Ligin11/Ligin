import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function EditContact({ updateContactHandler }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Ensure location.state and contact exist before destructuring
  const { id, name: initialName, email: initialEmail } = location.state.contact || {};
  
  const [name, setName] = useState(initialName || "");
  const [email, setEmail] = useState(initialEmail || "");

  const update = (e) => {
    e.preventDefault();
    
    if (!name || !email) {
      alert('All fields are mandatory!');
      return;
    }

    const updatedContact = { id, name, email };
    updateContactHandler(updatedContact);
    navigate('/');
  };

  return (
    <div className='max-w-lg mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Edit Contact</h2>
      <form onSubmit={update}>
        <div className='flex flex-col mb-4'>
          <label className='mb-1 font-semibold'>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full p-2 border rounded-md'
            required
          />
        </div>
        <div className='flex flex-col mb-4'>
          <label className='mb-1 font-semibold'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 border rounded-md'
            required
          />
        </div>
        <div className="flex gap-2">
          <button className='px-4 py-2 bg-blue-500 text-white rounded' type='submit'>
            Update Contact
          </button>
          <button className='px-4 py-2 bg-gray-400 text-white rounded' type='button' onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditContact; 
