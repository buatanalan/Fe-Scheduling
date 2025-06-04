import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ChargingSchedule } from '../types';

interface ChargingScheduleListProps {
  schedules: ChargingSchedule[];
}

export const ChargingScheduleList: React.FC<ChargingScheduleListProps> = ({ schedules }) => {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const renderScheduleItem = ({ item, index }: { item: ChargingSchedule; index: number }) => (
    <View style={styles.scheduleItem}>
      <View style={styles.scheduleHeader}>
        <Text style={styles.stationName}>{item.stationName}</Text>
        <Text style={styles.scheduleIndex}>#{index + 1}</Text>
      </View>
      
      <View style={styles.scheduleDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>📍 Port:</Text>
          <Text style={styles.detailValue}>{item.portNumber}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>⏰ Time:</Text>
          <Text style={styles.detailValue}>
            {formatTime(item.startTime)} - {formatTime(item.endTime)}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>⚡ Energy:</Text>
          <Text style={styles.detailValue}>{item.energyAmount} kWh</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>💰 Cost:</Text>
          <Text style={styles.costValue}>{formatCurrency(item.cost)}</Text>
        </View>
      </View>
      
      <View style={styles.locationInfo}>
        <Text style={styles.coordinatesText}>
          📍 {item.location.latitude.toFixed(4)}, {item.location.longitude.toFixed(4)}
        </Text>
      </View>
    </View>
  );

  if (schedules.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No charging schedules available</Text>
      </View>
    );
  }

  const totalCost = schedules.reduce((sum, schedule) => sum + schedule.cost, 0);
  const totalEnergy = schedules.reduce((sum, schedule) => sum + schedule.energyAmount, 0);

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Charging Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Stations:</Text>
          <Text style={styles.summaryValue}>{schedules.length}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Energy:</Text>
          <Text style={styles.summaryValue}>{totalEnergy} kWh</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Cost:</Text>
          <Text style={styles.totalCostValue}>{formatCurrency(totalCost)}</Text>
        </View>
      </View>

      <FlatList
        data={schedules}
        renderItem={renderScheduleItem}
        keyExtractor={(item, index) => `${item.stationId}-${index}`}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#1976D2',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
  },
  totalCostValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  list: {
    flex: 1,
  },
  scheduleItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  scheduleIndex: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scheduleDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
  costValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'right',
  },
  locationInfo: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 8,
  },
  coordinatesText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
