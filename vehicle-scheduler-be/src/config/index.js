require('dotenv').config();

module.exports = {
    apiBaseUrl: process.env.API_BASE_URL || 'http://4.224.186.213/evaluation-service',
    apiKey: process.env.API_KEY,
    port: process.env.PORT || 3000,
    logLevel: process.env.LOG_LEVEL || 'info',
};