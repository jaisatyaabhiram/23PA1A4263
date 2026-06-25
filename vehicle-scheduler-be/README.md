## Vehicle Scheduler Backend
# Vehicle Maintenance Scheduler

## Overview
Optimizes vehicle maintenance scheduling using 0/1 knapsack algorithm.

## Setup
1. Copy `.env.example` to `.env`
2. Add your API key
3. Run `npm install`
4. Start with `npm start`

## API Endpoints
- `GET /api/health` - Health check
- `GET /api/schedule` - All depot schedules
- `GET /api/schedule/:depotId` - Specific depot schedule

## Testing
- Run `node test-client.js` to test the API
- Run `npm test` for unit tests