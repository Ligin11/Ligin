import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

function AddContact(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All fields are mandatory!");
      return;
    }
    props.addContactHandler({ name, email });
    setName("");
    setEmail("");
    navigate ('/')
  };

  return (
    <div className='max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg'>
      <h2 className='text-xl font-bold mb-4'>Add Contact</h2>
      <form onSubmit={add}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Name</label>
          <input type='text' name='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} className='w-full p-2 border rounded-md'/>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input type='text' name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-2 border rounded-md'/>
        </div>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Add</button>
      </form>
    </div>
  );
}

export default AddContact;