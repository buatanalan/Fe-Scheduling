// Web fallback for react-native-maps
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MapViewProps {
  style?: any;
  region?: any;
  onRegionChange?: (region: any) => void;
  children?: React.ReactNode;
}

interface MarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title?: string;
  description?: string;
  pinColor?: string;
  children?: React.ReactNode;
}

interface PolylineProps {
  coordinates: Array<{
    latitude: number;
    longitude: number;
  }>;
  strokeColor?: string;
  strokeWidth?: number;
}

export const MapView: React.FC<MapViewProps> = ({ style, children }) => {
  return (
    <View style={[styles.mapContainer, style]}>
      <Text style={styles.mapPlaceholder}>
        🗺️ Map View
        {'\n'}(Web version - use mobile app for full map functionality)
      </Text>
      {children}
    </View>
  );
};

export const Marker: React.FC<MarkerProps> = ({ title, description, pinColor = 'red' }) => {
  return (
    <View style={styles.marker}>
      <Text style={styles.markerEmoji}>
        {pinColor === 'green' ? '🟢' : pinColor === 'blue' ? '🔵' : '🔴'}
      </Text>
      {title && <Text style={styles.markerTitle}>{title}</Text>}
      {description && <Text style={styles.markerDescription}>{description}</Text>}
    </View>
  );
};

export const Polyline: React.FC<PolylineProps> = ({ coordinates, strokeColor = 'blue' }) => {
  return (
    <View style={styles.polyline}>
      <Text style={styles.polylineText}>
        📍 Route: {coordinates.length} points ({strokeColor})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 10,
  },
  mapPlaceholder: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    padding: 20,
  },
  marker: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    margin: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerEmoji: {
    fontSize: 20,
  },
  markerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  markerDescription: {
    fontSize: 10,
    color: '#666',
  },
  polyline: {
    backgroundColor: 'rgba(0, 0, 255, 0.1)',
    padding: 8,
    borderRadius: 4,
    margin: 2,
  },
  polylineText: {
    fontSize: 12,
    color: '#333',
  },
});

export default MapView;
