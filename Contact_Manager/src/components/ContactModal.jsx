import React from 'react';
import user from "../images/user.png";

function ContactModal({ contact, closeModal }) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' onClick={closeModal}>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96' onClick={(e) => e.stopPropagation()}>
        <h2 className='text-xl font-bold mb-4'>Contact Details</h2>
        <div className='flex items-center gap-4'>
          <img className='w-20 h-20 rounded-full' src={user} alt='User' />
          <div>
            <p className='text-lg font-semibold'>{contact.name}</p>
            <p className='text-gray-600'>{contact.email}</p>
          </div>
        </div>
        <button className='mt-4 px-4 py-2 bg-red-500 text-white rounded' onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ContactModal;
