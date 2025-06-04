// Mock WebSocket Server for testing EV Charging Scheduler
// This is a simple Node.js WebSocket server for testing the front-end app

const WebSocket = require('ws');
const fs = require('fs');

const PORT = process.env.PORT || 8080;

function startServer(port) {
  try {
    const wss = new WebSocket.Server({ port: port });
    console.log(`Mock WebSocket server running on ws://localhost:${port}`);
    return wss;
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying port ${port + 1}`);
      return startServer(port + 1);
    } else {
      throw error;
    }
  }
}

const wss = startServer(PORT);

// Mock data
const mockChargingStations = [
  {
    id: 'spklu-001',
    name: 'SPKLU Senayan City',
    location: { latitude: -6.2267, longitude: 106.7968, address: 'Senayan City, Jakarta' },
    portNumber: 1,
    available: true
  },
  {
    id: 'spklu-002',
    name: 'SPKLU Grand Indonesia',
    location: { latitude: -6.1954, longitude: 106.8209, address: 'Grand Indonesia, Jakarta' },
    portNumber: 2,
    available: true
  },
  {
    id: 'spklu-003',
    name: 'SPKLU Pondok Indah Mall',
    location: { latitude: -6.2648, longitude: 106.7841, address: 'Pondok Indah Mall, Jakarta' },
    portNumber: 1,
    available: true
  }
];

function generateRoute(origin, destination) {
  // Simple mock route generation
  const latDiff = (destination.latitude - origin.latitude) / 10;
  const lonDiff = (destination.longitude - origin.longitude) / 10;
  
  const route = [];
  for (let i = 0; i <= 10; i++) {
    route.push({
      latitude: origin.latitude + (latDiff * i),
      longitude: origin.longitude + (lonDiff * i)
    });
  }
  
  return route;
}

function generateChargingSchedule(origin, destination) {
  const schedules = [];
  const now = new Date();
  
  // Add 2-3 charging stops
  for (let i = 0; i < Math.min(2, mockChargingStations.length); i++) {
    const station = mockChargingStations[i];
    const startTime = new Date(now.getTime() + (i + 1) * 60 * 60 * 1000); // +1, +2 hours
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // +30 minutes
    
    schedules.push({
      stationId: station.id,
      stationName: station.name,
      location: station.location,
      portNumber: station.portNumber,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      energyAmount: 25 + (i * 10), // 25kWh, 35kWh
      cost: 50000 + (i * 25000) // Rp 50.000, Rp 75.000
    });
  }
  
  return schedules;
}

wss.on('connection', function connection(ws) {
  console.log('New client connected');
  
  // Send connection confirmation
  ws.send(JSON.stringify({
    type: 'connection_established',
    message: 'Connected to EV Charging Scheduler'
  }));
  
  ws.on('message', function incoming(message) {
    try {
      const data = JSON.parse(message);
      console.log('Received:', data);
      
      if (data.type === 'trip_request') {
        const { origin, destination } = data;
        
        // Simulate processing delay
        setTimeout(() => {
          const route = generateRoute(origin, destination);
          const chargingSchedules = generateChargingSchedule(origin, destination);
          
          const response = {
            type: 'route_response',
            route: route,
            chargingSchedules: chargingSchedules,
            totalDistance: 45.5, // km
            estimatedTravelTime: 75, // minutes
            totalCost: chargingSchedules.reduce((sum, schedule) => sum + schedule.cost, 0)
          };
          
          ws.send(JSON.stringify(response));
          
          // Start sending vehicle status updates
          startVehicleSimulation(ws, route, chargingSchedules);
        }, 1000);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
  
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

function startVehicleSimulation(ws, route, chargingSchedules) {
  let currentIndex = 0;
  let batteryLevel = 80; // Start with 80% battery
  let isCharging = false;
  
  const interval = setInterval(() => {
    if (currentIndex >= route.length) {
      clearInterval(interval);
      return;
    }
    
    const currentLocation = route[currentIndex];
    const speed = 45 + Math.random() * 20; // 45-65 km/h
    
    // Simulate battery drain
    if (!isCharging) {
      batteryLevel = Math.max(0, batteryLevel - 0.5);
    }
    
    // Check if near charging station
    const nearStation = chargingSchedules.find(schedule => {
      const distance = Math.sqrt(
        Math.pow(schedule.location.latitude - currentLocation.latitude, 2) +
        Math.pow(schedule.location.longitude - currentLocation.longitude, 2)
      );
      return distance < 0.001; // Very close
    });
    
    if (nearStation && batteryLevel < 90) {
      isCharging = true;
      batteryLevel = Math.min(100, batteryLevel + 2);
    } else {
      isCharging = false;
    }
    
    const vehicleStatus = {
      type: 'vehicle_status',
      currentLocation: currentLocation,
      batteryLevel: Math.round(batteryLevel),
      isCharging: isCharging,
      currentSpeed: Math.round(speed),
      estimatedArrival: new Date(Date.now() + (route.length - currentIndex) * 2000).toISOString(),
      nextChargingStation: chargingSchedules.find(s => !s.completed)
    };
    
    ws.send(JSON.stringify(vehicleStatus));
    
    currentIndex++;
  }, 2000); // Update every 2 seconds
}

console.log('Mock server ready to receive connections...');
