const makeTransfers = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/payments/fetchDayTransaction');
    const paystackResponse = await response.json();

    // console.log('Paystack Response:', paystackResponse);
    return paystackResponse;
  } catch (error) {
    console.error('Error navigating to product URL:', error);
    // Handle the error as needed
  }
};
module.exports = { makeTransfers }