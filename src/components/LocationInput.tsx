import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import { Location as LocationType } from '../types';

interface LocationInputProps {
  label: string;
  value: LocationType | null;
  onLocationChange: (location: LocationType) => void;
  placeholder?: string;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  label,
  value,
  onLocationChange,
  placeholder = 'Enter address or coordinates'
}) => {
  const [inputText, setInputText] = useState(value?.address || '');
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Get address from coordinates
      const [address] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const addressString = `${address.street || ''} ${address.city || ''} ${address.region || ''}`.trim();
        const locationData: LocationType = {
        latitude,
        longitude,
        address: addressString || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
      };

      setInputText(locationData.address || '');
      onLocationChange(locationData);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get current location');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextSubmit = async () => {
    if (!inputText.trim()) return;

    try {
      setIsLoading(true);

      // Check if input is coordinates (latitude, longitude)
      const coordPattern = /^-?\d+\.?\d*,\s*-?\d+\.?\d*$/;
      if (coordPattern.test(inputText)) {
        const [lat, lng] = inputText.split(',').map(s => parseFloat(s.trim()));
        const locationData: LocationType = {
          latitude: lat,
          longitude: lng,
          address: inputText
        };
        onLocationChange(locationData);
        return;
      }

      // Geocode address to coordinates
      const locations = await Location.geocodeAsync(inputText);
      if (locations.length > 0) {
        const { latitude, longitude } = locations[0];
        const locationData: LocationType = {
          latitude,
          longitude,
          address: inputText
        };
        onLocationChange(locationData);
      } else {
        Alert.alert('Address Not Found', 'Please enter a valid address');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      Alert.alert('Error', 'Failed to find location');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder={placeholder}
          onSubmitEditing={handleTextSubmit}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.gpsButton}
          onPress={getCurrentLocation}
          disabled={isLoading}
        >
          <Text style={styles.gpsButtonText}>📍</Text>
        </TouchableOpacity>
      </View>
      {value && (
        <Text style={styles.coordinatesText}>
          {value.latitude.toFixed(6)}, {value.longitude.toFixed(6)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  gpsButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
  },
  gpsButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  coordinatesText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});
