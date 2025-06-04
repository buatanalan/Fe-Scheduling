export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface ChargingStation {
  id: string;
  name: string;
  location: Location;
  portNumber: number;
  available: boolean;
}

export interface ChargingSchedule {
  stationId: string;
  stationName: string;
  location: Location;
  portNumber: number;
  startTime: string;
  endTime: string;
  energyAmount: number; // kWh
  cost: number; // dalam rupiah
}

export interface RouteResponse {
  route: Location[];
  chargingSchedules: ChargingSchedule[];
  totalDistance: number; // km
  estimatedTravelTime: number; // minutes
  totalCost: number;
}

export interface VehicleStatus {
  currentLocation: Location;
  batteryLevel: number; // percentage
  isCharging: boolean;
  currentSpeed: number; // km/h
  estimatedArrival?: string;
  nextChargingStation?: ChargingSchedule;
}

export interface TripRequest {
  origin: Location;
  destination: Location;
  vehicleId?: string;
  currentBatteryLevel?: number;
}
