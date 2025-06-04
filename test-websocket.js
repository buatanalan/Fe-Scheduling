const WebSocket = require('ws');

// Test script untuk WebSocket connection
console.log('🔗 Testing WebSocket connection...');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  console.log('✅ Connected to WebSocket server');
  
  // Test trip request
  const tripRequest = {
    type: 'TRIP_REQUEST',
    payload: {
      origin: {
        latitude: -6.200000,
        longitude: 106.816666,
        address: 'Jakarta'
      },
      destination: {
        latitude: -6.914744,
        longitude: 107.609810,
        address: 'Bandung'
      },
      vehicleId: 'TEST_VEHICLE',
      currentBatteryLevel: 80
    }
  };
  
  console.log('📤 Sending trip request:', JSON.stringify(tripRequest, null, 2));
  ws.send(JSON.stringify(tripRequest));
});

ws.on('message', function message(data) {
  console.log('📥 Received message:', JSON.parse(data.toString()));
});

ws.on('error', function error(err) {
  console.error('❌ WebSocket error:', err.message);
});

ws.on('close', function close() {
  console.log('🔌 WebSocket connection closed');
});

// Close connection after 10 seconds
setTimeout(() => {
  console.log('⏰ Closing test connection...');
  ws.close();
}, 10000);
