import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import Header from './components/Header';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import ContactList from './components/ContactList';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const updateContactHandler = (updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setContacts(updatedContacts);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='min-h-screen bg-gray-100'>
      <Router>
        <Header />
        <div className='container mx-auto px-4 py-6'>
          <Routes>
            <Route 
              path='/' 
              element={<ContactList contacts={contacts} getContactId={removeContactHandler} />} 
            />
            <Route 
              path='/add' 
              element={<AddContact addContactHandler={addContactHandler} />} 
            />
            <Route 
              path='/edit' 
              element={<EditContact updateContactHandler={updateContactHandler} />} 
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App; 
