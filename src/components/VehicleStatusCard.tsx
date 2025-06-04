import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VehicleStatus } from '../types';

interface VehicleStatusCardProps {
  status: VehicleStatus;
}

export const VehicleStatusCard: React.FC<VehicleStatusCardProps> = ({ status }) => {
  const getBatteryColor = (level: number) => {
    if (level > 50) return '#4CAF50'; // Green
    if (level > 20) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return 'N/A';
    const date = new Date(timeString);
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle Status</Text>
      
      <View style={styles.statusGrid}>
        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>Battery Level</Text>
          <View style={styles.batteryContainer}>
            <View style={styles.batteryBackground}>
              <View 
                style={[
                  styles.batteryFill, 
                  { 
                    width: `${status.batteryLevel}%`,
                    backgroundColor: getBatteryColor(status.batteryLevel)
                  }
                ]} 
              />
            </View>
            <Text style={[styles.batteryText, { color: getBatteryColor(status.batteryLevel) }]}>
              {status.batteryLevel}%
            </Text>
          </View>
        </View>

        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>Current Speed</Text>
          <Text style={styles.statusValue}>{status.currentSpeed} km/h</Text>
        </View>

        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>Status</Text>
          <Text style={[
            styles.statusValue, 
            { color: status.isCharging ? '#4CAF50' : '#333' }
          ]}>
            {status.isCharging ? '🔌 Charging' : '🚗 Driving'}
          </Text>
        </View>

        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>Location</Text>
          <Text style={styles.coordinatesText}>
            {status.currentLocation.latitude.toFixed(4)}, {status.currentLocation.longitude.toFixed(4)}
          </Text>
        </View>
      </View>

      {status.estimatedArrival && (
        <View style={styles.arrivalInfo}>
          <Text style={styles.arrivalLabel}>Estimated Arrival</Text>
          <Text style={styles.arrivalTime}>{formatTime(status.estimatedArrival)}</Text>
        </View>
      )}

      {status.nextChargingStation && (
        <View style={styles.nextChargingInfo}>
          <Text style={styles.nextChargingLabel}>Next Charging Station</Text>
          <Text style={styles.stationName}>{status.nextChargingStation.stationName}</Text>
          <Text style={styles.chargingDetails}>
            Port {status.nextChargingStation.portNumber} • {status.nextChargingStation.energyAmount} kWh
          </Text>
          <Text style={styles.chargingTime}>
            {formatTime(status.nextChargingStation.startTime)} - {formatTime(status.nextChargingStation.endTime)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusItem: {
    width: '48%',
    marginBottom: 12,
  },
  statusLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryBackground: {
    flex: 1,
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginRight: 8,
    overflow: 'hidden',
  },
  batteryFill: {
    height: '100%',
    borderRadius: 10,
  },
  batteryText: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 40,
  },
  coordinatesText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
  arrivalInfo: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  arrivalLabel: {
    fontSize: 12,
    color: '#1976D2',
    marginBottom: 4,
  },
  arrivalTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
  },
  nextChargingInfo: {
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  nextChargingLabel: {
    fontSize: 12,
    color: '#388E3C',
    marginBottom: 4,
  },
  stationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#388E3C',
    marginBottom: 2,
  },
  chargingDetails: {
    fontSize: 14,
    color: '#388E3C',
    marginBottom: 2,
  },
  chargingTime: {
    fontSize: 14,
    color: '#388E3C',
    fontWeight: '500',
  },
});
