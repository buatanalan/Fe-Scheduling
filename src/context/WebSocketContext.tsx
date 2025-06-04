import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { TripRequest, RouteResponse, VehicleStatus } from '../types';
import { CONFIG, MESSAGES, TRIP_TYPES } from '../constants';

interface WebSocketContextType {
  isConnected: boolean;
  sendTripRequest: (request: TripRequest) => void;
  routeResponse: RouteResponse | null;
  vehicleStatus: VehicleStatus | null;
  error: string | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [routeResponse, setRouteResponse] = useState<RouteResponse | null>(null);
  const [vehicleStatus, setVehicleStatus] = useState<VehicleStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  // WebSocket server URL - sesuaikan dengan backend service Anda
  const WS_URL = CONFIG.WS_URL;

  useEffect(() => {
    connectWebSocket();
    
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    try {
      const websocket = new WebSocket(WS_URL);
      
      websocket.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setError(null);
      };

      websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'route_response') {
            setRouteResponse(data.payload);
          } else if (data.type === 'vehicle_status') {
            setVehicleStatus(data.payload);
          } else if (data.type === 'error') {
            setError(data.message);
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
          setError('Error parsing server response');
        }
      };

      websocket.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        
        // Auto-reconnect after 3 seconds
        setTimeout(() => {
          connectWebSocket();
        }, 3000);
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Connection error');
      };

      setWs(websocket);
    } catch (err) {
      console.error('Failed to connect WebSocket:', err);
      setError('Failed to connect to server');
    }
  };

  const sendTripRequest = (request: TripRequest) => {
    if (ws && isConnected) {
      const message = {
        type: 'trip_request',
        payload: request
      };
      
      ws.send(JSON.stringify(message));
      setError(null);
    } else {
      setError('Not connected to server');
    }
  };

  const value: WebSocketContextType = {
    isConnected,
    sendTripRequest,
    routeResponse,
    vehicleStatus,
    error
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
