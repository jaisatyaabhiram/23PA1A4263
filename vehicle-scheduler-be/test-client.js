const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
    console.log('🚗 Testing Vehicle Maintenance Scheduler API...\n');
    
    try {
        // Health check
        console.log('1️⃣ Health Check:');
        const health = await axios.get(`${BASE_URL}/api/health`);
        console.log(`Status: ${health.data.status}\n`);
        
        // Get all schedules
        console.log('2️⃣ Getting all schedules:');
        const schedules = await axios.get(`${BASE_URL}/api/schedule`);
        console.log(`Success: ${schedules.data.success}`);
        console.log(`Total Impact: ${schedules.data.summary.totalImpact}`);
        console.log(`Total Tasks: ${schedules.data.summary.totalTasks}`);
        console.log(`Utilization: ${schedules.data.summary.utilization}`);
        console.log(`Number of Depots: ${schedules.data.depots.length}\n`);
        
        // Get specific depot
        console.log('3️⃣ Getting Depot 1 schedule:');
        const depot1 = await axios.get(`${BASE_URL}/api/schedule/1`);
        const depot = depot1.data.depot;
        console.log(`Depot ${depot.depotId}:`);
        console.log(`  Mechanic Hours: ${depot.mechanicHours}`);
        console.log(`  Total Impact: ${depot.totalImpact}`);
        console.log(`  Total Tasks: ${depot.totalTasks}`);
        console.log(`  Duration Used: ${depot.totalDuration}`);
        console.log(`  Selected Tasks: ${depot.selectedTasks.length}`);
        
    } catch (error) {
        console.error('❌ Error testing API:', error.response?.data || error.message);
    }
}

testAPI();