const jwt = require('jsonwebtoken');

const JWT_TOKEN = 'jUf7tRGCDz8qPw4HLv4FipzktmItfj0Ig1YEu8WmQBY=';
const URL = 'http://localhost:3000';

const generateAffiliateLink = (userId, productId) => {
    const token = jwt.sign({ userId, productId }, JWT_TOKEN);
    return `${URL}/affiliate/${token}`;
};

module.exports = generateAffiliateLink;
