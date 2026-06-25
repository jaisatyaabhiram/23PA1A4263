const axios = require('axios');
const config = require('../config');

class ApiService {
    constructor() {
        this.client = axios.create({
            baseURL: config.apiBaseUrl,
            headers: {
                'Authorization': `Bearer ${config.apiKey}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async fetchDepots() {
        try {
            const response = await this.client.get('/depots');
            return response.data.depots;
        } catch (error) {
            throw new Error(`Failed to fetch depots: ${error.message}`);
        }
    }

    async fetchVehicles() {
        try {
            const response = await this.client.get('/vehicles');
            return response.data.vehicles;
        } catch (error) {
            throw new Error(`Failed to fetch vehicles: ${error.message}`);
        }
    }
}

module.exports = new ApiService();