const app = require('./src/app');
const config = require('./src/config');

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`🚗 Vehicle Maintenance Scheduler running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📋 Schedule endpoint: http://localhost:${PORT}/api/schedule`);
});