import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import user from "../images/user.png";
import ContactModal from "./ContactModal";

function ContactCard({ contact, clickHandler }) {
  const { id, name, email } = contact;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div
        className='flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md mb-4 cursor-pointer'
        onClick={openModal}
      >
        <div className='flex items-center gap-4'>
          <img className='w-10 h-10 rounded-full' src={user} alt='User' />
          <div>
            <p className='text-lg font-semibold'>{name}</p>
            <p className='text-gray-600'>{email}</p>
          </div>
        </div>
        <div className='flex gap-3'>
          {/* Edit Button */}
          <button
            className='text-blue-500'
            onClick={(e) => {
              e.stopPropagation(); // Prevents modal from opening
              navigate("/edit", { state: { contact } });
            }}
          >
            ✏️
          </button>

          {/* Delete Button */}
          <button
            className='text-red-500'
            onClick={(e) => {
              e.stopPropagation();
              clickHandler(id);
            }}
          >
            🗑
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      {isOpen && <ContactModal contact={contact} closeModal={closeModal} />}
    </>
  );
}

export default ContactCard;
