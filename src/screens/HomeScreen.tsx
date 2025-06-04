import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LocationInput } from '../components/LocationInput';
import { VehicleStatusCard } from '../components/VehicleStatusCard';
import { useWebSocket } from '../context/WebSocketContext';
import { Location } from '../types';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    isConnected, 
    sendTripRequest, 
    routeResponse, 
    vehicleStatus, 
    error 
  } = useWebSocket();

  const handlePlanTrip = async () => {
    if (!origin || !destination) {
      // Alert.alert('Missing Information', 'Please enter both origin and destination');
      return;
    }

    if (!isConnected) {
      // Alert.alert('Connection Error', 'Not connected to server. Please check your connection.');
      return;
    }

    setIsLoading(true);
    
    try {
      sendTripRequest({
        origin,
        destination,
        vehicleId: 'EV001', // Default vehicle ID
        currentBatteryLevel: vehicleStatus?.batteryLevel || 80, // Default battery level
      });

      // Wait a moment for response
      setTimeout(() => {
        setIsLoading(false);
        if (routeResponse) {
          navigation.navigate('Route', {
            routeResponse,
            origin,
            destination,
          });
        }
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      // Alert.alert('Error', 'Failed to plan trip. Please try again.');
    }
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EV Charging Scheduler</Text>
        <Text style={styles.subtitle}>Plan your electric vehicle journey</Text>
        
        <View style={styles.connectionStatus}>
          <View style={[
            styles.connectionIndicator, 
            { backgroundColor: isConnected ? '#4CAF50' : '#F44336' }
          ]} />
          {/* <Text style={styles.connectionText}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </Text> */}
        </View>
      </View>

      {/* {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )} */}

      <View style={styles.inputSection}>
        <LocationInput
          label="📍 Origin (From)"
          value={origin}
          onLocationChange={setOrigin}
          placeholder="Enter starting location"
        />

        <LocationInput
          label="🎯 Destination (To)"
          value={destination}
          onLocationChange={setDestination}
          placeholder="Enter destination"
        />

        <TouchableOpacity
          style={[
            styles.planButton,
            (!origin || !destination || !isConnected || isLoading) && styles.planButtonDisabled
          ]}
          onPress={()=>{
            navigation.navigate('Route', {
            routeResponse,
            origin,
            destination,
          })
          }}
          // disabled={!origin || !destination || !isConnected || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.planButtonText}>🗺️ Plan Trip</Text>
          )}
        </TouchableOpacity>
      </View>

      {vehicleStatus && (
        <VehicleStatusCard status={vehicleStatus} />
      )}

      {/* <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>How it works:</Text>
        <Text style={styles.infoText}>
          1. Enter your starting location and destination{'\n'}
          2. Tap "Plan Trip" to get optimal charging schedule{'\n'}
          3. Follow the route with automatic charging stops{'\n'}
          4. Monitor your vehicle status in real-time
        </Text>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  connectionText: {
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
  },
  inputSection: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  planButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  planButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,  },
});

export default HomeScreen;
