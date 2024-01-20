const jwt = require('jsonwebtoken');

const JWT_TOKEN = 'jUf7tRGCDz8qPw4HLv4FipzktmItfj0Ig1YEu8WmQBY=';
const URL = 'http://localhost:3000';

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
        // console.log({userId, productId });
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
