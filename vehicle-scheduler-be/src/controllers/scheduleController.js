const apiService = require('../services/apiService');
const knapsackService = require('../services/knapsackService');

class ScheduleController {
    async getAllSchedules(req, res) {
        try {
            const depots = await apiService.fetchDepots();
            const vehicles = await apiService.fetchVehicles();
            
            const schedules = depots.map(depot => {
                const result = knapsackService.processDepotSchedule(
                    vehicles,
                    depot.MechanicHours
                );
                
                return {
                    depotId: depot.ID,
                    mechanicHours: depot.MechanicHours,
                    totalImpact: result.totalImpact,
                    totalDuration: result.totalDuration,
                    selectedTasks: result.selectedItems,
                    totalTasks: result.selectedItems.length
                };
            });
            
            const summary = schedules.reduce((acc, curr) => ({
                totalImpact: acc.totalImpact + curr.totalImpact,
                totalDuration: acc.totalDuration + curr.totalDuration,
                totalTasks: acc.totalTasks + curr.totalTasks,
                totalMechanicHours: acc.totalMechanicHours + curr.mechanicHours
            }), { totalImpact: 0, totalDuration: 0, totalTasks: 0, totalMechanicHours: 0 });
            
            res.json({
                success: true,
                depots: schedules,
                summary: {
                    ...summary,
                    utilization: ((summary.totalDuration / summary.totalMechanicHours) * 100).toFixed(2) + '%'
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Failed to generate schedule',
                details: error.message
            });
        }
    }

    async getDepotSchedule(req, res) {
        try {
            const depotId = parseInt(req.params.depotId);
            const depots = await apiService.fetchDepots();
            const depot = depots.find(d => d.ID === depotId);
            
            if (!depot) {
                return res.status(404).json({
                    success: false,
                    error: `Depot ${depotId} not found`
                });
            }
            
            const vehicles = await apiService.fetchVehicles();
            const result = knapsackService.processDepotSchedule(
                vehicles,
                depot.MechanicHours
            );
            
            res.json({
                success: true,
                depot: {
                    depotId: depot.ID,
                    mechanicHours: depot.MechanicHours,
                    totalImpact: result.totalImpact,
                    totalDuration: result.totalDuration,
                    selectedTasks: result.selectedItems,
                    totalTasks: result.selectedItems.length
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Failed to generate depot schedule',
                details: error.message
            });
        }
    }
}

module.exports = new ScheduleController();