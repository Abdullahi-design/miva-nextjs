"use client";
import { useState } from "react";
import ConfirmationModal from "./modal/ConfirmationModal";

const PayoutInput = ({ handleSubmit, banks, submitting, bankDetails, setBankDetails }) => {
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

    const handleConfirmSubmit = (e) => {
        e.preventDefault();
        setConfirmationModalOpen(false);
        handleSubmit(e);
    };

  return (
    <div>        
        <form 
        onSubmit={(e) => {
            e.preventDefault();
            setConfirmationModalOpen(true);
        }}
        className=' w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        >
            <label className='flex flex-col items-start mt-4'>
                <span className='font-satoshi font-semibold text-base text-gray-700 mb-2'>
                    Bank Name
                </span>
                    <select
                    value={bankDetails.bankName}
                    onChange={(e) => {
                        const selectedBank = banks.find((bank) => bank.name === e.target.value);
                        setBankDetails({ ...bankDetails, bankName: e.target.value, bankCode: selectedBank?.code || '' });
                    }}
                    required
                    className='form_select appearance-none w-full py-2 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500'
                >
                    <option value="" disabled>Select your bank</option>
                    {banks.map((bank) => (
                        <option key={bank.id} value={bank.name}>
                            {bank.name}
                        </option>
                    ))}
                </select>
            </label>
                
            <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
                Account Number{" "}
            </span>
            <input
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                type='number'
                placeholder='AccountNumber'
                required
                className='form_input'
            />
            </label>

            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Alise Name{" "}
                </span>
                <input
                    value={bankDetails.aliseName}
                    onChange={(e) => setBankDetails({ ...bankDetails, aliseName: e.target.value })}
                    type='text'
                    placeholder='Alise Name'
                    required
                    className='form_input'
                />
            </label>
            <button
                type='submit'
                disabled={submitting}
                className='px-5 py-1.5 text-sm bg-primary-orange rounded-lg text-white'
            >
                {submitting ? `Adding...` : 'Add Bank Account'}
            </button>
        </form>
        <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            onClose={() => setConfirmationModalOpen(false)}
            onConfirm={handleConfirmSubmit}
            formData={bankDetails}
        />
    </div>
  )
}

export default PayoutInput