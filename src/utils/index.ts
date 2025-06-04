// Utility functions for the EV Charging Scheduler app

import { Location } from '../types';

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export const calculateDistance = (origin: Location, destination: Location): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(destination.latitude - origin.latitude);
  const dLon = toRadians(destination.longitude - origin.longitude);
  
  const lat1 = toRadians(origin.latitude);
  const lat2 = toRadians(destination.latitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * Convert degrees to radians
 */
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Format duration in minutes to human readable format
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

/**
 * Format distance to human readable format
 */
export const formatDistance = (km: number): string => {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(1)}km`;
};

/**
 * Format currency using Indonesian Rupiah
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date to local string
 */
export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format time only
 */
export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Calculate estimated arrival time
 */
export const calculateEstimatedArrival = (
  distance: number,
  averageSpeed: number = 50
): Date => {
  const travelTimeHours = distance / averageSpeed;
  const travelTimeMs = travelTimeHours * 60 * 60 * 1000;
  return new Date(Date.now() + travelTimeMs);
};

/**
 * Generate intermediate points for route visualization
 */
export const generateRoutePoints = (
  origin: Location,
  destination: Location,
  steps: number = 10
): Location[] => {
  const points: Location[] = [];
  
  for (let i = 0; i <= steps; i++) {
    const ratio = i / steps;
    points.push({
      latitude: origin.latitude + (destination.latitude - origin.latitude) * ratio,
      longitude: origin.longitude + (destination.longitude - origin.longitude) * ratio,
    });
  }
  
  return points;
};

/**
 * Validate coordinates
 */
export const isValidCoordinate = (location: Location): boolean => {
  return (
    location.latitude >= -90 &&
    location.latitude <= 90 &&
    location.longitude >= -180 &&
    location.longitude <= 180
  );
};

/**
 * Calculate battery consumption rate
 */
export const calculateBatteryConsumption = (
  distance: number,
  efficiency: number = 0.2 // kWh per km
): number => {
  return distance * efficiency;
};

/**
 * Calculate charging time needed
 */
export const calculateChargingTime = (
  energyNeeded: number,
  chargingPower: number = 50 // kW
): number => {
  return (energyNeeded / chargingPower) * 60; // minutes
};

/**
 * Generate random vehicle status for simulation
 */
export const generateMockVehicleStatus = (
  currentLocation: Location,
  batteryLevel: number
): any => {
  return {
    currentLocation,
    batteryLevel: Math.max(15, batteryLevel - Math.random() * 2),
    isCharging: false,
    currentSpeed: 45 + Math.random() * 20,
    estimatedArrival: calculateEstimatedArrival(50).toISOString(),
  };
};
