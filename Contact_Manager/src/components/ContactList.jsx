import React, { useState } from 'react';
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom';

function ContactList({ contacts, getContactId }) {
  const [searchTerm, setSearchTerm] = useState("");

  const deleteContactHandler = (id) => {
    getContactId(id);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContactList = filteredContacts.map((contact) => (
    <ContactCard key={contact.id} contact={contact} clickHandler={deleteContactHandler} />
  ));

  return (
    <div className='max-w-lg mx-auto mt-8'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold'>Contact List</h2>
        <Link to='/add'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Add Contact</button>
        </Link>
      </div>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search Contacts...'
          className='w-full p-2 border rounded-md'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>{renderContactList.length > 0 ? renderContactList : <p className='text-center text-gray-500'>No contacts found</p>}</div>
    </div>
  );
}

export default ContactList;
