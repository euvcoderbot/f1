/* ==========================================
   F1 MOCK DATA
   Testing data for all races, sessions, drivers
   ========================================== */

const mockData = {
    2024: {
        races: [
            { round: 1, name: "Bahrain Grand Prix", circuit: "Bahrain International Circuit", date: "2024-03-01", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 2, name: "Saudi Arabian Grand Prix", circuit: "Jeddah Corniche Circuit", date: "2024-03-09", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 3, name: "Australian Grand Prix", circuit: "Albert Park", date: "2024-03-24", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 4, name: "Japanese Grand Prix", circuit: "Suzuka Circuit", date: "2024-04-07", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 5, name: "Chinese Grand Prix", circuit: "Shanghai International Circuit", date: "2024-04-21", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 6, name: "Miami Grand Prix", circuit: "Miami International Autodrome", date: "2024-05-05", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 7, name: "Emilia Romagna Grand Prix", circuit: "Autodromo Enzo e Dino Ferrari", date: "2024-05-19", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 8, name: "Monaco Grand Prix", circuit: "Circuit de Monaco", date: "2024-05-26", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 9, name: "Canadian Grand Prix", circuit: "Circuit Gilles Villeneuve", date: "2024-06-09", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 10, name: "Spanish Grand Prix", circuit: "Circuit de Barcelona-Catalunya", date: "2024-06-23", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 11, name: "Austrian Grand Prix", circuit: "Red Bull Ring", date: "2024-07-07", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 12, name: "British Grand Prix", circuit: "Silverstone Circuit", date: "2024-07-21", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 13, name: "Hungarian Grand Prix", circuit: "Hungaroring", date: "2024-08-04", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 14, name: "Belgian Grand Prix", circuit: "Circuit de Spa-Francorchamps", date: "2024-08-25", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 15, name: "Dutch Grand Prix", circuit: "Circuit Zandvoort", date: "2024-09-01", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 16, name: "Italian Grand Prix", circuit: "Autodromo Nazionale di Monza", date: "2024-09-08", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 17, name: "Azerbaijani Grand Prix", circuit: "Baku City Circuit", date: "2024-09-15", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 18, name: "Singapore Grand Prix", circuit: "Marina Bay Street Circuit", date: "2024-09-22", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 19, name: "Japanese Grand Prix", circuit: "Suzuka Circuit", date: "2024-10-06", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 20, name: "United States Grand Prix", circuit: "Circuit of The Americas", date: "2024-10-20", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 21, name: "Mexico City Grand Prix", circuit: "Autódromo Hermanos Rodríguez", date: "2024-10-27", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 22, name: "São Paulo Grand Prix", circuit: "Autódromo José Carlos Pace", date: "2024-11-03", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 23, name: "Las Vegas Grand Prix", circuit: "Las Vegas Street Circuit", date: "2024-11-23", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
            { round: 24, name: "Abu Dhabi Grand Prix", circuit: "Yas Marina Circuit", date: "2024-12-08", drivers: ["1", "33", "44", "81", "16", "55", "10", "27", "20", "24"] },
        ]
    }
};

const drivers = {
    "1": { name: "Max Verstappen", team: "Red Bull", number: 1, color: "#0600EF" },
    "33": { name: "Alex Albon", team: "Red Bull", number: 33, color: "#0600EF" },
    "44": { name: "Lewis Hamilton", team: "Mercedes", number: 44, color: "#00D4BE" },
    "81": { name: "Oscar Piastri", team: "McLaren", number: 81, color: "#FF8700" },
    "16": { name: "Charles Leclerc", team: "Ferrari", number: 16, color: "#DC0000" },
    "55": { name: "Carlos Sainz", team: "Ferrari", number: 55, color: "#DC0000" },
    "10": { name: "Lando Norris", team: "McLaren", number: 10, color: "#FF8700" },
    "27": { name: "Nico Hulkenberg", team: "Haas", number: 27, color: "#FFFFFF" },
    "20": { name: "Kevin Magnussen", team: "Haas", number: 20, color: "#FFFFFF" },
    "24": { name: "Zhou Guanyu", team: "Alfa Romeo", number: 24, color: "#900000" }
};

// Generate mock telemetry data for a lap
function generateLapTelemetry(lapTime = 83.456) {
    const points = 200; // Data points per lap
    const telemetry = [];
    
    for (let i = 0; i < points; i++) {
        const progress = i / points; // 0 to 1
        const distance = (progress * 5303).toFixed(1); // Albert Park is ~5303m
        const time = (progress * lapTime).toFixed(3);
        
        // Simulate realistic speed curve (corners and straights)
        let speed = 150;
        if (progress < 0.15) speed = 150 + progress * 50; // Acceleration
        else if (progress < 0.25) speed = 200 - (progress - 0.15) * 100; // Breaking into turn 1
        else if (progress < 0.35) speed = 100 + (progress - 0.25) * 100; // Corner
        else if (progress < 0.5) speed = 200 + (progress - 0.35) * 133; // Straight
        else if (progress < 0.65) speed = 200 - (progress - 0.5) * 133; // Breaking
        else if (progress < 0.8) speed = 100 + (progress - 0.65) * 133; // Corner
        else speed = 230 - (progress - 0.8) * 200; // Final straight to finish
        
        // Throttle and brake
        let throttle = Math.max(0, 100 - Math.abs(Math.sin(progress * Math.PI * 4)) * 150);
        let brake = Math.max(0, Math.sin(progress * Math.PI * 4) * 80);
        
        // DRS (simplified - open on straights)
        const drs = progress > 0.85 || progress < 0.1 ? 1 : 0;
        
        telemetry.push({
            time: parseFloat(time),
            distance: parseFloat(distance),
            speed: Math.max(50, Math.min(350, speed + (Math.random() - 0.5) * 10)),
            throttle: Math.max(0, Math.min(100, throttle + (Math.random() - 0.5) * 5)),
            brake: Math.max(0, Math.min(100, brake + (Math.random() - 0.5) * 5)),
            drs: drs
        });
    }
    
    return telemetry;
}

// Generate mock lap data
function generateRaceLapData(driverId, numLaps = 58) {
    const laps = [];
    const baseTime = 83.0 + Math.random() * 2; // Base lap time 83-85s
    
    for (let lap = 1; lap <= numLaps; lap++) {
        const lapTime = baseTime + (Math.random() - 0.5) * 1.5; // Variation
        const sector1 = lapTime * 0.33 + (Math.random() - 0.5) * 0.3;
        const sector2 = lapTime * 0.34 + (Math.random() - 0.5) * 0.3;
        const sector3 = lapTime * 0.33 + (Math.random() - 0.5) * 0.3;
        
        laps.push({
            lapNumber: lap,
            lapTime: lapTime.toFixed(3),
            sector1: sector1.toFixed(3),
            sector2: sector2.toFixed(3),
            sector3: sector3.toFixed(3),
            isBestLap: lap === Math.floor(numLaps * 0.6), // Best lap around 60% through race
            tireCompound: lap < 20 ? "soft" : lap < 40 ? "medium" : "hard",
            telemetry: generateLapTelemetry(lapTime)
        });
    }
    
    // Ensure one best lap
    const bestLap = laps.reduce((best, lap) => 
        parseFloat(lap.lapTime) < parseFloat(best.lapTime) ? lap : best
    );
    bestLap.isBestLap = true;
    
    return laps;
}

// Get session data
function getSessionData(year, roundNumber, session) {
    const race = mockData[year].races.find(r => r.round === roundNumber);
    if (!race) return null;
    
    const sessionData = {
        year,
        round: roundNumber,
        race: race.name,
        circuit: race.circuit,
        session,
        drivers: {}
    };
    
    // Generate data for each driver
    race.drivers.forEach(driverId => {
        sessionData.drivers[driverId] = {
            ...drivers[driverId],
            laps: generateRaceLapData(driverId, session === "Race" ? 58 : 30)
        };
    });
    
    return sessionData;
}

// Get all races for a year
function getRacesForYear(year) {
    return mockData[year]?.races || [];
}

// Get drivers list
function getDriversList() {
    return Object.values(drivers);
}

// Get specific lap telemetry
function getLapTelemetry(year, round, session, driverId, lapNumber) {
    const sessionData = getSessionData(year, round, session);
    if (!sessionData || !sessionData.drivers[driverId]) return null;
    
    const lap = sessionData.drivers[driverId].laps.find(l => l.lapNumber === lapNumber);
    return lap || null;
}
