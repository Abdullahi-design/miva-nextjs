// PayoutCard.js

import Link from 'next/link';
import React from 'react';
import { FaStore } from 'react-icons/fa';

const PayoutCard = ({ paymentMethod }) => {
  const isMonniePoint = paymentMethod.name === 'Monnie Point';

  return (
    <div className={`p-4 px-12 bg-white block w-full rounded-md shadow-md ${isMonniePoint ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="flex items-center mb-2">
        <FaStore className="w-5 h-5 mr-2 text-primary-orange" />
        <p className="font-bold font-satoshi text-lg">{paymentMethod.name}</p>
      </div>
      <p className="text-gray-600">Get paid out to your {paymentMethod.name} account</p>
      <p className="text-gray-600">Transaction Fee: {paymentMethod.transactionFee * 100} %</p>
      <button
        disabled={isMonniePoint}
        className={`w-fit px-4 mt-4 py-2 text-sm ${isMonniePoint ? 'bg-gray-300' : 'bg-primary-orange hover:bg-white hover:text-gray-700'} border ${isMonniePoint ? 'border-gray-300' : 'border-primary-orange'} rounded-md font-satoshi text-white`}
      >
        {isMonniePoint ? (
          'Configure Account'
        ) : (
          <Link href={paymentMethod.href}>
            Configure Account
          </Link>
        )}
      </button>
    </div>
  );
};

export default PayoutCard;
