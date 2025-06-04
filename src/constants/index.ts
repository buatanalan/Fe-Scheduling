// Configuration constants for the EV Charging Scheduler app

export const CONFIG = {
  // WebSocket server configuration
  WS_URL: __DEV__ 
    ? process.env.EXPO_PUBLIC_WEBSOCKET_URL || 'ws://localhost:8080'
    : process.env.EXPO_PUBLIC_WEBSOCKET_URL || 'ws://your-production-server:port',
  
  // Reconnection settings
  WS_RECONNECT_INTERVAL: 3000,
  WS_MAX_RECONNECT_ATTEMPTS: 5,
  
  // Map configuration
  DEFAULT_REGION: {
    latitude: -6.200000,
    longitude: 106.816666,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  
  // UI Configuration
  COLORS: {
    PRIMARY: '#1976D2',
    SECONDARY: '#4CAF50',
    ACCENT: '#FF9800',
    ERROR: '#F44336',
    WARNING: '#FF9800',
    SUCCESS: '#4CAF50',
    TEXT_PRIMARY: '#333333',
    TEXT_SECONDARY: '#666666',
    BACKGROUND: '#F5F5F5',
    SURFACE: '#FFFFFF',
  },
  
  // Animation durations
  ANIMATION_DURATION: 300,
  
  // Vehicle simulation settings
  VEHICLE_UPDATE_INTERVAL: 3000,
  DEFAULT_BATTERY_LEVEL: 85,
  MIN_BATTERY_LEVEL: 15,
  
  // Charging station colors
  MARKER_COLORS: {
    ORIGIN: 'green',
    DESTINATION: 'red',
    CHARGING_STATION: 'blue',
    VEHICLE: 'orange',
  },
  
  // Currency settings
  CURRENCY: {
    LOCALE: 'id-ID',
    CURRENCY: 'IDR',
  },
};

export const MESSAGES = {
  WEBSOCKET: {
    CONNECTING: 'Connecting to server...',
    CONNECTED: 'Connected to server',
    DISCONNECTED: 'Disconnected from server',
    ERROR: 'Connection error',
    RECONNECTING: 'Reconnecting...',
  },
  LOCATION: {
    PERMISSION_DENIED: 'Location permission denied',
    UNAVAILABLE: 'Location service unavailable',
    TIMEOUT: 'Location request timeout',
  },
  TRIP: {
    PLANNING: 'Planning your trip...',
    SUCCESS: 'Trip planned successfully',
    ERROR: 'Failed to plan trip',
  },
};

export const TRIP_TYPES = {
  REQUEST: 'TRIP_REQUEST',
  RESPONSE: 'ROUTE_RESPONSE',
  VEHICLE_STATUS: 'VEHICLE_STATUS',
  CONNECTION_STATUS: 'CONNECTION_STATUS',
};
