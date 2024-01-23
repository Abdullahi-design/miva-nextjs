// ConfirmationModal.js

import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, formData }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white p-4 sm:p-8 mx-4 rounded-md shadow-md max-w-screen-sm">
        <p className="text-lg sm:text-xl font-semibold mb-4">Are you sure you want to submit the following details?</p>

        {/* Display the form data */}
        <p className='text-base sm:text-lg font-bold'>Bank Name: <span className='text-green-700'>{formData.bankName}</span></p>
        <p className='text-base sm:text-lg font-bold'>Account Number: <span className='text-green-700'>{formData.accountNumber}</span></p>
        <p className='text-base sm:text-lg font-bold'>Alise Name: <span className='text-green-700'>{formData.aliseName}</span></p>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-md"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="px-4 py-2 bg-primary-orange text-white rounded-md"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
