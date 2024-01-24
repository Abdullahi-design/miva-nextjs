
import { FaStore } from 'react-icons/fa';

const DisplayBank = ({ dataFetched }) => {

  return (
    <div className="p-4 px-12 bg-white block w-full rounded-md shadow-md ">
      <h1 className='font-bold font-satoshi text-xl text-center my-3'>Your bank details</h1>
      <div className="flex items-center mb-2">
        <FaStore className="w-5 h-5 mr-2 text-primary-orange" />
        <p className="font-bold font-satoshi tracking-widest text-md">{dataFetched.settlement_bank}</p>
      </div>
        <p className='text-base sm:text-md font-normal tracking-wide'>Currency: <span className='text-green-700 tracking-wider'>{dataFetched.currency}</span></p>
        <p className='text-base sm:text-md font-normal tracking-wide'>Account Name: <span className='text-green-700 tracking-wider'>{dataFetched.account_name}</span></p>
        <p className='text-base sm:text-md font-normal tracking-wide'>Account Number: <span className='text-green-700 tracking-wider'>{dataFetched.account_number}</span></p>
      {/* <button
        // disabled={isMonniePoint}
        className={`w-fit px-4 mt-4 py-2 text-sm rounded-md font-satoshi text-white`}
      >

      </button> */}
    </div>
  );
};

export default DisplayBank;
