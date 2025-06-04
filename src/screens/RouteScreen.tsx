import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MapView, Marker, Polyline } from '../components/MapView';
import { ChargingScheduleList } from '../components/ChargingScheduleList';
import { VehicleStatusCard } from '../components/VehicleStatusCard';
import { useWebSocket } from '../context/WebSocketContext';
import { RouteResponse, Location } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { formatDuration, formatDistance, formatCurrency } from '../utils';

type RootStackParamList = {
  Home: undefined;
  Route: {
    origin: any;
    destination: any;
  };
};

type RouteScreenProps = StackScreenProps<RootStackParamList, 'Route'>;

const RouteScreen: React.FC<RouteScreenProps> = ({ route, navigation }) => {
  const [activeTab, setActiveTab] = useState<'map' | 'schedule'>('map');
  const { routeResponse, vehicleStatus } = useWebSocket();
  const { origin, destination } = route.params;
  // Mock data for testing
  const mockRouteResponse: RouteResponse = {
    route: [origin, destination],
    chargingSchedules: [
      {
        stationId: 'spklu-001',
        stationName: 'SPKLU Mall Taman Anggrek',
        location: {
          latitude: (origin.latitude + destination.latitude) / 2,
          longitude: (origin.longitude + destination.longitude) / 2,
          address: 'Mall Taman Anggrek, Jakarta'
        },
        portNumber: 1,
        startTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
        energyAmount: 45,
        cost: 67500
      }
    ],
    totalDistance: 50.5,
    estimatedTravelTime: 120,
    totalCost: 67500
  };

  const currentRoute = routeResponse || mockRouteResponse;

  // Calculate map region to fit all points
  const getMapRegion = () => {
    const allPoints = [origin, destination];
    if (vehicleStatus) {
      allPoints.push(vehicleStatus.currentLocation);
    }

    const latitudes = allPoints.map(point => point.latitude);
    const longitudes = allPoints.map(point => point.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    const midLat = (minLat + maxLat) / 2;
    const midLng = (minLng + maxLng) / 2;
    const deltaLat = (maxLat - minLat) * 1.2;
    const deltaLng = (maxLng - minLng) * 1.2;

    return {
      latitude: midLat,
      longitude: midLng,
      latitudeDelta: Math.max(deltaLat, 0.01),
      longitudeDelta: Math.max(deltaLng, 0.01),
    };
  };
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDistance = (km: number) => {
    return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      {/* Header with trip summary */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trip Overview</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Distance</Text>
            <Text style={styles.summaryValue}>{formatDistance(currentRoute.totalDistance)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>{formatDuration(currentRoute.estimatedTravelTime)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Cost</Text>
            <Text style={styles.summaryValue}>{formatCurrency(currentRoute.totalCost)}</Text>
          </View>
        </View>
      </View>

      {/* Tab buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'map' && styles.tabButtonActive]}
          onPress={() => setActiveTab('map')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'map' && styles.tabButtonTextActive]}>
            🗺️ Map
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'schedule' && styles.tabButtonActive]}
          onPress={() => setActiveTab('schedule')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'schedule' && styles.tabButtonTextActive]}>
            📋 Schedule
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'map' ? (        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={getMapRegion()}
          >
            {/* Route polyline */}
            <Polyline
              coordinates={currentRoute.route}
              strokeColor="#4CAF50"
              strokeWidth={4}
            />

            {/* Origin marker */}
            <Marker
              coordinate={origin}
              title="Origin"
              description={origin.address || 'Starting point'}
              pinColor="green"
            />

            {/* Destination marker */}
            <Marker
              coordinate={destination}
              title="Destination"
              description={destination.address || 'End point'}
              pinColor="red"
            />

            {/* Charging station markers */}
            {currentRoute.chargingSchedules.map((schedule, index) => (
              <Marker
                key={`charging-${index}`}
                coordinate={schedule.location}
                title={schedule.stationName}
                description={`Port ${schedule.portNumber} • ${schedule.energyAmount}kWh`}
                pinColor="blue"
              />
            ))}

            {/* Current vehicle location */}
            {vehicleStatus && (
              <Marker
                coordinate={vehicleStatus.currentLocation}
                title="Your Vehicle"
                description={`Battery: ${vehicleStatus.batteryLevel}%`}
                pinColor="orange"
              />
            )}
          </MapView>

          {/* Vehicle status overlay */}
          {vehicleStatus && (
            <View style={styles.statusOverlay}>
              <VehicleStatusCard status={vehicleStatus} />
            </View>
          )}
        </View>
      ) : (
        <ScrollView style={styles.scheduleContainer}>
          <ChargingScheduleList schedules={currentRoute.chargingSchedules} />
          
          {vehicleStatus && (
            <VehicleStatusCard status={vehicleStatus} />
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tabButtonActive: {
    backgroundColor: '#E3F2FD',
    borderBottomWidth: 2,
    borderBottomColor: '#1976D2',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#666',
  },
  tabButtonTextActive: {
    color: '#1976D2',
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  statusOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  scheduleContainer: {
    flex: 1,
  },
});

export default RouteScreen;
