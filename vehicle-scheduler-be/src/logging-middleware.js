// src/logging-middleware.js
const axios = require('axios');

class LoggingMiddleware {
    constructor() {
        this.baseUrl = 'http://4.224.186.213/evaluation-service';
        this.token = process.env.BEARER_TOKEN || '';
    }

    async log(stack, level, packageName, message) {
        // Validate inputs
        const validStacks = ['backend', 'frontend'];
        const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
        const validPackages = ['cache', 'controller', 'cron_job', 'db', 'domain', 
                              'handler', 'repository', 'route', 'service',
                              'auth', 'config', 'middleware', 'utils'];

        if (!validStacks.includes(stack) || 
            !validLevels.includes(level) || 
            !validPackages.includes(packageName)) {
            console.error('Invalid log parameters');
            return false;
        }

        try {
            const response = await axios.post(
                `${this.baseUrl}/logs`,
                { stack, level, package: packageName, message },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                }
            );
            console.log(`✅ Log sent: [${level.toUpperCase()}] ${message}`);
            return response.data;
        } catch (error) {
            console.error('❌ Log failed:', error.response?.data || error.message);
            return false;
        }
    }

    // Middleware function for Express
    middleware() {
        return async (req, res, next) => {
            await this.log('backend', 'info', 'middleware', 
                `${req.method} ${req.url} - ${req.ip}`);
            next();
        };
    }
}

// Export both the class and an instance
module.exports = new LoggingMiddleware();
module.exports.LoggingMiddleware = LoggingMiddleware;