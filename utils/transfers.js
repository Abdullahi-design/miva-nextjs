require('dotenv').config()

const makeTransfers = async () => {
  const URL = process.env.NEXT_PUBLIC_URL;

  try {
    const response = await fetch(`${URL}/api/payments/fetchDayTransaction`);
    const paystackResponse = await response.json();

    // console.log('Paystack Response:', paystackResponse);
    return paystackResponse;
  } catch (error) {
    console.error('Error navigating to product URL:', error);
    // Handle the error as needed
  }
};
module.exports = { makeTransfers }