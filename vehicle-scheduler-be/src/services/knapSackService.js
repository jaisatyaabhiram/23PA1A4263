class KnapsackService {
    solve(items, capacity) {
        const n = items.length;
        
        // DP table
        const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
        
        // Fill DP table
        for (let i = 1; i <= n; i++) {
            const { Duration, Impact } = items[i - 1];
            for (let w = 0; w <= capacity; w++) {
                if (Duration <= w) {
                    dp[i][w] = Math.max(
                        dp[i - 1][w],
                        Impact + dp[i - 1][w - Duration]
                    );
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        
        // Backtrack to find selected items
        const selected = [];
        let w = capacity;
        let totalImpact = dp[n][capacity];
        
        for (let i = n; i > 0 && totalImpact > 0; i--) {
            if (totalImpact !== dp[i - 1][w]) {
                selected.push(items[i - 1]);
                totalImpact -= items[i - 1].Impact;
                w -= items[i - 1].Duration;
            }
        }
        
        return {
            selectedItems: selected.reverse(),
            totalImpact: dp[n][capacity],
            totalDuration: capacity - w
        };
    }

    processDepotSchedule(vehicles, mechanicHours) {
        const tasks = vehicles.map(vehicle => ({
            TaskID: vehicle.TaskID,
            Duration: vehicle.Duration,
            Impact: vehicle.Impact
        }));

        return this.solve(tasks, mechanicHours);
    }
}

module.exports = new KnapsackService();