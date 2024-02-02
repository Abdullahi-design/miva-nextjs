const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_TOKEN = process.env.JWT_TOKEN;
const URL = process.env.NEXT_PUBLIC_URL;

const generateAffiliateLink = (userId, productId) => {
    const token = jwt.sign({ userId, productId }, JWT_TOKEN);
    return `${URL}/affiliate/${token}`;
};

const extractUserInfoFromAffiliateLink = (affiliateLink) => {
    try {
        // Assuming the format is ${URL}/affiliate/${token}
        const token = affiliateLink.split('/').pop();

        const decodedToken = jwt.decode(token, JWT_TOKEN);
        const { userId, productId } = decodedToken;
        
        // console.log(`Decoded User ID: ${userId}, Product ID: ${productId}`);
        console.log({userId, productId }, {JWT_TOKEN});
        return { userId, productId }; // Return the decoded information

    } catch (error) {
        console.error('Error decoding token:', error.message);
        return null;
    }
};

module.exports = {
    generateAffiliateLink,
    extractUserInfoFromAffiliateLink
}
