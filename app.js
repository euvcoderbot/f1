/* ==========================================
   F1 TELEMETRY APP - MAIN APPLICATION
   ========================================== */

class F1TelemetryApp {
    constructor() {
        this.currentYear = 2024;
        this.currentRound = 3; // Australia
        this.currentSession = "Race";
        this.selectedDrivers = [];
        this.selectedLaps = {};
        this.charts = {};
        this.isDarkMode = localStorage.getItem('theme') === 'dark';
        this.isGlassMode = localStorage.getItem('design') === 'glass';
        
        this.init();
    }

    init() {
        this.applyTheme();
        this.applyDesign();
        this.setupEventListeners();
        this.loadRaces();
        this.loadDrivers();
        this.loadSessions();
        this.loadLaps();
    }

    // ==========================================
    // THEME & DESIGN MANAGEMENT
    // ==========================================

    applyTheme() {
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    applyDesign() {
        if (this.isGlassMode) {
            document.body.classList.add('glass-mode');
        } else {
            document.body.classList.remove('glass-mode');
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
        this.applyTheme();
        
        // Update icon
        const icon = document.getElementById('theme-toggle').querySelector('.toggle-icon');
        icon.textContent = this.isDarkMode ? '🌙' : '☀️';
        
        // Refresh charts with new colors
        this.updateAllCharts();
    }

    toggleDesign() {
        this.isGlassMode = !this.isGlassMode;
        localStorage.setItem('design', this.isGlassMode ? 'glass' : 'flat');
        this.applyDesign();
        
        // Update label
        const label = document.getElementById('design-toggle').querySelector('.toggle-label');
        label.textContent = this.isGlassMode ? 'GLASS' : 'FLAT';
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================

    setupEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
        
        // Design toggle
        document.getElementById('design-toggle').addEventListener('click', () => this.toggleDesign());
        
        // Hamburger menu
        document.getElementById('hamburger-menu').addEventListener('click', () => this.toggleSidebar());
        document.getElementById('sidebar-close').addEventListener('click', () => this.closeSidebar());
        
        // Dropdowns
        document.getElementById('year-select').addEventListener('change', (e) => this.changeYear(e.target.value));
        document.getElementById('race-select').addEventListener('change', (e) => this.changeRace(parseInt(e.target.value)));
        document.getElementById('session-select').addEventListener('change', (e) => this.changeSession(e.target.value));
        
        // Session buttons
        document.querySelectorAll('.session-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectSession(btn.dataset.session));
        });
        
        // Lap filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => this.filterLaps(btn.dataset.filter));
        });
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('open');
    }

    // ==========================================
    // RACE & SESSION MANAGEMENT
    // ==========================================

    loadRaces() {
        const races = getRacesForYear(this.currentYear);
        const raceSelect = document.getElementById('race-select');
        const raceList = document.getElementById('race-list');
        
        raceSelect.innerHTML = '';
        raceList.innerHTML = '';
        
        races.forEach(race => {
            // Add to dropdown
            const option = document.createElement('option');
            option.value = race.round;
            option.textContent = `${race.round}. ${race.name}`;
            if (race.round === this.currentRound) option.selected = true;
            raceSelect.appendChild(option);
            
            // Add to race list
            const raceBtn = document.createElement('button');
            raceBtn.className = `race-item ${race.round === this.currentRound ? 'active' : ''}`;
            raceBtn.innerHTML = `
                <div>${race.name}</div>
                <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">${race.circuit}</div>
            `;
            raceBtn.addEventListener('click', () => {
                this.changeRace(race.round);
                gsap.from(raceBtn, { duration: 0.3, scale: 0.95, opacity: 0 });
            });
            raceList.appendChild(raceBtn);
        });
        
        this.updateBreadcrumb();
    }

    changeRace(round) {
        this.currentRound = round;
        this.loadRaces();
        this.loadLaps();
        this.updateBreadcrumb();
        this.closeSidebar();
    }

    changeSession(session) {
        this.currentSession = session;
        document.getElementById('session-select').value = session;
        document.querySelectorAll('.session-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.session === session);
        });
        this.loadLaps();
        this.updateBreadcrumb();
    }

    selectSession(session) {
        this.changeSession(session);
    }

    changeYear(year) {
        this.currentYear = parseInt(year);
        this.loadRaces();
        this.updateBreadcrumb();
    }

    updateBreadcrumb() {
        const race = getRacesForYear(this.currentYear).find(r => r.round === this.currentRound);
        document.getElementById('breadcrumb-race').textContent = race ? `${this.currentRound}. ${race.name.split(' ').pop()}` : '--';
        document.getElementById('breadcrumb-session').textContent = this.currentSession;
    }

    // ==========================================
    // DRIVER MANAGEMENT
    // ==========================================

    loadDrivers() {
        const race = getRacesForYear(this.currentYear).find(r => r.round === this.currentRound);
        const driverGrid = document.getElementById('driver-grid');
        driverGrid.innerHTML = '';
        
        if (!race) return;
        
        race.drivers.forEach(driverId => {
            const driver = drivers[driverId];
            const card = document.createElement('div');
            card.className = `driver-card ${this.selectedDrivers.includes(driverId) ? 'selected' : ''}`;
            card.innerHTML = `
                <div class="driver-number">${driver.number}</div>
                <div class="driver-name">${driver.name.split(' ')[1] || driver.name}</div>
                <div class="driver-team">${driver.team}</div>
                <div class="driver-color-indicator" style="background-color: ${driver.color};"></div>
            `;
            
            card.addEventListener('click', () => {
                this.toggleDriverSelection(driverId);
                gsap.to(card, { duration: 0.2, scale: 0.95 }).then(() => {
                    gsap.to(card, { duration: 0.2, scale: 1 });
                });
            });
            
            driverGrid.appendChild(card);
        });
    }

    toggleDriverSelection(driverId) {
        const index = this.selectedDrivers.indexOf(driverId);
        
        if (index > -1) {
            this.selectedDrivers.splice(index, 1);
            delete this.selectedLaps[driverId];
        } else {
            this.selectedDrivers.push(driverId);
            this.selectedLaps[driverId] = [];
        }
        
        this.loadDrivers();
        this.updateSelectedDriversDisplay();
        this.loadLaps();
        this.updateCharts();
    }

    updateSelectedDriversDisplay() {
        const display = document.getElementById('selected-drivers-display');
        display.innerHTML = '';
        
        if (this.selectedDrivers.length === 0) {
            display.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 20px;">Select drivers to compare</div>';
            return;
        }
        
        this.selectedDrivers.forEach(driverId => {
            const driver = drivers[driverId];
            const box = document.createElement('div');
            box.className = 'selected-driver-box';
            box.innerHTML = `
                <div class="selected-driver-number">${driver.number}</div>
                <div class="selected-driver-name">${driver.name.split(' ')[1] || driver.name}</div>
                <button class="selected-driver-remove">✕</button>
                <div class="color-picker-btn" style="background-color: ${driver.color};" title="Click to change color"></div>
            `;
            
            box.querySelector('.selected-driver-remove').addEventListener('click', () => {
                this.toggleDriverSelection(driverId);
            });
            
            box.querySelector('.color-picker-btn').addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'color';
                input.value = driver.color;
                input.addEventListener('change', (e) => {
                    driver.color = e.target.value;
                    this.updateSelectedDriversDisplay();
                    this.updateCharts();
                });
                input.click();
            });
            
            display.appendChild(box);
        });
    }

    // ==========================================
    // LAP MANAGEMENT
    // ==========================================

    loadLaps() {
        const lapsList = document.getElementById('laps-list');
        lapsList.innerHTML = '';
        
        if (this.selectedDrivers.length === 0) {
            lapsList.innerHTML = '<div style="color: var(--text-secondary); font-size: 12px;">Select drivers to see laps</div>';
            return;
        }
        
        this.selectedDrivers.forEach(driverId => {
            const sessionData = getSessionData(this.currentYear, this.currentRound, this.currentSession);
            if (!sessionData || !sessionData.drivers[driverId]) return;
            
            const driverLaps = sessionData.drivers[driverId].laps;
            const bestLap = driverLaps.find(l => l.isBestLap);
            
            driverLaps.forEach(lap => {
                const lapBtn = document.createElement('button');
                lapBtn.className = `lap-item ${this.selectedLaps[driverId]?.includes(lap.lapNumber) ? 'selected' : ''}`;
                lapBtn.innerHTML = `
                    <span>Lap ${lap.lapNumber}</span>
                    <span class="lap-time">${lap.lapTime}s</span>
                    ${lap.isBestLap ? '<span class="lap-badge">BEST</span>' : ''}
                `;
                
                lapBtn.addEventListener('click', () => {
                    this.toggleLapSelection(driverId, lap.lapNumber);
                    gsap.to(lapBtn, { duration: 0.2, scale: 0.95 }).then(() => {
                        gsap.to(lapBtn, { duration: 0.2, scale: 1 });
                    });
                });
                
                lapsList.appendChild(lapBtn);
            });
        });
    }

    toggleLapSelection(driverId, lapNumber) {
        if (!this.selectedLaps[driverId]) {
            this.selectedLaps[driverId] = [];
        }
        
        const index = this.selectedLaps[driverId].indexOf(lapNumber);
        if (index > -1) {
            this.selectedLaps[driverId].splice(index, 1);
        } else {
            this.selectedLaps[driverId].push(lapNumber);
        }
        
        this.loadLaps();
        this.updateCharts();
        this.updateStats();
    }

    filterLaps(filter) {
        // Placeholder for lap filtering logic
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
    }

    // ==========================================
    // CHARTS & VISUALIZATION
    // ==========================================

    getChartColors() {
        return this.isDarkMode ? {
            text: '#e0e0e0',
            grid: '#333333',
            bg: '#1e1e1e'
        } : {
            text: '#1a1a1a',
            grid: '#e5e5e5',
            bg: '#ffffff'
        };
    }

    updateCharts() {
        this.updateSpeedChart();
        this.updateThrottleChart();
        this.updateBrakeChart();
        this.updateDRSChart();
    }

    updateAllCharts() {
        // Destroy existing charts
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
        this.updateCharts();
    }

    updateSpeedChart() {
        const ctx = document.getElementById('speed-graph');
        if (!ctx) return;
        
        if (this.charts.speed) this.charts.speed.destroy();
        
        const datasets = this.getChartDatasets('speed');
        const colors = this.getChartColors();
        
        this.charts.speed = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.getDistanceLabels(),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: colors.text, font: { size: 12 } }
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 350,
                        ticks: { color: colors.text },
                        grid: { color: colors.grid }
                    },
                    x: {
                        ticks: { color: colors.text },
                        grid: { color: colors.grid }
                    }
                }
            }
        });
    }

    updateThrottleChart() {
        const ctx = document.getElementById('throttle-graph');
        if (!ctx) return;
        
        if (this.charts.throttle) this.charts.throttle.destroy();
        
        const datasets = this.getChartDatasets('throttle');
        const colors = this.getChartColors();
        
        this.charts.throttle = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.getDistanceLabels(),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: colors.text, font: { size: 12 } }
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 100,
                        ticks: { color: colors.text },
                        grid: { color: colors.grid }
                    },
                    x: {
                        ticks: { color: colors.text },
                        grid: { color: colors.grid }
                    }
                }
            }
        });
    }

    updateBrakeChart() {
        const ctx = document.getElementById('brake-graph');
        if (!ctx) return;
        
        if (this.charts.brake) this.charts.brake.destroy();
        
        const datasets = this.getChartDatasets('brake');
        const colors = this.getChartColors();
        
        this.charts.brake = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.getDistanceLabels(),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: colors.text, font: { size: 12 } }
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 100,
                        ticks: { color: colors.text },
                        grid: { color: colors.grid }
                    },
                    x: {
                        ticks: { color: colors.text },
                        grid: { color: colors.grid }
                    }
                }
            }
        });
    }

    updateDRSChart() {
        const ctx = document.getElementById('drs-graph');
        if (!ctx) return;
        
        if (this.charts.drs) this.charts.drs.destroy();
        
        const datasets = this.getChartDatasets('drs');
        const colors = this.getChartColors();
        
        this.charts.drs = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.getDistanceLabels(),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: colors.text, font: { size: 12 } }
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 1,
                        ticks: { color: colors.text, callback: v => v === 1 ? 'OPEN' : 'CLOSED' },
                        grid: { color: colors.grid }
                    },
                    x: {
                        ticks: { color: colors.text },
                        grid: { color: colors.grid }
                    }
                }
            }
        });
    }

    getChartDatasets(metric) {
        const datasets = [];
        const colors = ['#0600EF', '#DC0000', '#FF8700', '#00D4BE', '#0082FA'];
        let colorIndex = 0;
        
        this.selectedDrivers.forEach(driverId => {
            const sessionData = getSessionData(this.currentYear, this.currentRound, this.currentSession);
            if (!sessionData || !sessionData.drivers[driverId]) return;
            
            const selectedLaps = this.selectedLaps[driverId] || [];
            if (selectedLaps.length === 0) return;
            
            const driver = drivers[driverId];
            const driverColor = driver.color || colors[colorIndex % colors.length];
            
            selectedLaps.forEach((lapNum, lapIndex) => {
                const lap = sessionData.drivers[driverId].laps.find(l => l.lapNumber === lapNum);
                if (!lap) return;
                
                const data = lap.telemetry.map(point => {
                    switch (metric) {
                        case 'speed': return point.speed;
                        case 'throttle': return point.throttle;
                        case 'brake': return point.brake;
                        case 'drs': return point.drs;
                        default: return 0;
                    }
                });
                
                const borderColor = this.adjustBrightness(driverColor, -20 * lapIndex);
                
                datasets.push({
                    label: `${driver.name} - Lap ${lapNum}`,
                    data: data,
                    borderColor: borderColor,
                    backgroundColor: borderColor + '20',
                    tension: 0.3,
                    borderWidth: 2,
                    fill: false
                });
            });
            
            colorIndex++;
        });
        
        return datasets;
    }

    getDistanceLabels() {
        const points = 200;
        const labels = [];
        for (let i = 0; i < points; i++) {
            labels.push(Math.round((i / points) * 100) + '%');
        }
        return labels;
    }

    adjustBrightness(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, Math.min(255, (num >> 16) + amt));
        const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
        const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }

    // ==========================================
    // STATISTICS
    // ==========================================

    updateStats() {
        this.updateLapTimesTable();
        this.updateSectorTable();
    }

    updateLapTimesTable() {
        const tbody = document.querySelector('#lap-times-table tbody');
        tbody.innerHTML = '';
        
        if (this.selectedDrivers.length === 0) return;
        
        const allLapTimes = [];
        
        this.selectedDrivers.forEach(driverId => {
            const sessionData = getSessionData(this.currentYear, this.currentRound, this.currentSession);
            if (!sessionData || !sessionData.drivers[driverId]) return;
            
            const selectedLaps = this.selectedLaps[driverId] || [];
            if (selectedLaps.length === 0) return;
            
            const driver = drivers[driverId];
            
            selectedLaps.forEach(lapNum => {
                const lap = sessionData.drivers[driverId].laps.find(l => l.lapNumber === lapNum);
                if (!lap) return;
                
                allLapTimes.push({
                    driverId,
                    driverName: driver.name,
                    lapNumber: lapNum,
                    lapTime: parseFloat(lap.lapTime),
                    sector1: lap.sector1,
                    sector2: lap.sector2,
                    sector3: lap.sector3
                });
            });
        });
        
        const bestTime = Math.min(...allLapTimes.map(l => l.lapTime));
        
        allLapTimes.forEach(lapData => {
            const gap = lapData.lapTime === bestTime ? 'BEST' : '+' + (lapData.lapTime - bestTime).toFixed(3) + 's';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${lapData.driverName}</td>
                <td>${lapData.lapNumber}</td>
                <td class="lap-time-value">${lapData.lapTime.toFixed(3)}s</td>
                <td class="gap-value ${lapData.lapTime === bestTime ? 'gap-best' : 'gap-slower'}">${gap}</td>
                <td>${lapData.sector1}</td>
                <td>${lapData.sector2}</td>
                <td>${lapData.sector3}</td>
            `;
            tbody.appendChild(row);
        });
    }

    updateSectorTable() {
        const tbody = document.querySelector('#sector-comparison-table tbody');
        tbody.innerHTML = '';
        
        if (this.selectedDrivers.length < 2) return;
        
        const driverId1 = this.selectedDrivers[0];
        const driverId2 = this.selectedDrivers[1];
        
        const sessionData = getSessionData(this.currentYear, this.currentRound, this.currentSession);
        if (!sessionData) return;
        
        const lap1 = this.selectedLaps[driverId1]?.[0];
        const lap2 = this.selectedLaps[driverId2]?.[0];
        
        if (!lap1 || !lap2) return;
        
        const lapData1 = sessionData.drivers[driverId1].laps.find(l => l.lapNumber === lap1);
        const lapData2 = sessionData.drivers[driverId2].laps.find(l => l.lapNumber === lap2);
        
        if (!lapData1 || !lapData2) return;
        
        const sectors = [
            { name: 'S1', val1: parseFloat(lapData1.sector1), val2: parseFloat(lapData2.sector1) },
            { name: 'S2', val1: parseFloat(lapData1.sector2), val2: parseFloat(lapData2.sector2) },
            { name: 'S3', val1: parseFloat(lapData1.sector3), val2: parseFloat(lapData2.sector3) }
        ];
        
        sectors.forEach(sector => {
            const diff = (sector.val2 - sector.val1).toFixed(3);
            const winner = diff > 0 ? drivers[driverId1].name : drivers[driverId2].name;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sector.name}</td>
                <td class="lap-time-value">${sector.val1}s</td>
                <td class="lap-time-value">${sector.val2}s</td>
                <td class="gap-value ${diff > 0 ? 'gap-best' : 'gap-slower'}">${diff}s (${winner})</td>
            `;
            tbody.appendChild(row);
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new F1TelemetryApp();
});
