# EV Charging Scheduler - React Native Expo App

Aplikasi mobile untuk sistem penjadwalan pengecasan baterai kendaraan listrik yang dikembangkan dengan Expo React Native. Aplikasi ini dapat menerima input lokasi asal dan tujuan, mengirimkan permintaan perjalanan ke backend melalui WebSocket, dan menampilkan rute serta jadwal pengisian yang diterima dari backend service.

## 🚀 Fitur Utama

- **Input Lokasi**: Menerima input lokasi asal dan tujuan dengan GPS picker dan geocoding
- **Komunikasi WebSocket**: Mengirimkan trip request dan menerima response real-time dari backend
- **Visualisasi Rute**: Menampilkan peta dengan rute perjalanan dan lokasi SPKLU
- **Jadwal Pengisian**: Menampilkan detail jadwal pengisian termasuk lokasi, waktu, energi, dan biaya
- **Status Kendaraan**: Menampilkan status real-time kendaraan seperti lokasi, battery level, kecepatan
- **Simulasi Perjalanan**: Menampilkan pergerakan kendaraan mengikuti rute seperti sistem navigasi

## 📱 Screenshots

[Screenshots akan ditambahkan setelah testing]

## 🛠️ Teknologi yang Digunakan

- **React Native 0.76.3**
- **Expo SDK 52.0.0**
- **TypeScript**
- **React Navigation 6**
- **React Native Maps**
- **Expo Location**
- **WebSocket untuk komunikasi real-time**

## 📋 Prerequisites

Sebelum menjalankan aplikasi, pastikan sudah terinstall:

- Node.js (versi 18 atau lebih baru)
- npm atau yarn
- Expo CLI
- Expo Go app di smartphone (untuk testing)

## 🚀 Instalasi dan Menjalankan Aplikasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd Fe-Scheduling
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Jalankan Mock Server (untuk testing)
Buka terminal baru dan jalankan:
```bash
npm run mock-server
```
Mock server akan berjalan di `ws://localhost:8080`

### 4. Jalankan Expo Development Server
```bash
npm start
```
atau
```bash
npx expo start
```

### 5. Testing di Device
- Scan QR code yang muncul dengan Expo Go app
- Atau gunakan Android/iOS simulator

## 🏗️ Struktur Proyek

```
Fe-Scheduling/
├── App.tsx                 # Entry point aplikasi
├── app.json               # Konfigurasi Expo
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── babel.config.js        # Babel config
├── mock-server.js         # Mock WebSocket server untuk testing
├── assets/                # Asset gambar dan icon
└── src/
    ├── components/        # Reusable components
    │   ├── LocationInput.tsx
    │   ├── VehicleStatusCard.tsx
    │   └── ChargingScheduleList.tsx
    ├── screens/           # Screen components
    │   ├── HomeScreen.tsx
    │   └── RouteScreen.tsx
    ├── context/           # React Context
    │   └── WebSocketContext.tsx
    ├── types/             # TypeScript interfaces
    │   └── index.ts
    └── services/          # API services
```

## 🔧 Konfigurasi

### WebSocket Backend
Edit file `src/context/WebSocketContext.tsx` untuk mengubah URL backend:
```typescript
const WS_URL = 'ws://your-backend-server:port';
```

### Google Maps API
Untuk production, tambahkan Google Maps API key di `app.json`:
```json
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
        }
      }
    },
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_GOOGLE_MAPS_API_KEY"
      }
    }
  }
}
```

## 📡 API WebSocket

### Trip Request
```json
{
  "type": "TRIP_REQUEST",
  "payload": {
    "origin": {
      "latitude": -6.200000,
      "longitude": 106.816666,
      "address": "Jakarta"
    },
    "destination": {
      "latitude": -6.914744,
      "longitude": 107.609810,
      "address": "Bandung"
    }
  }
}
```

### Route Response
```json
{
  "type": "ROUTE_RESPONSE",
  "payload": {
    "route": [
      {
        "latitude": -6.200000,
        "longitude": 106.816666
      }
    ],
    "chargingSchedules": [
      {
        "stationId": "spklu-001",
        "stationName": "SPKLU Mall Taman Anggrek",
        "location": {
          "latitude": -6.178306,
          "longitude": 106.790779,
          "address": "Mall Taman Anggrek, Jakarta"
        },
        "portNumber": 1,
        "startTime": "2025-06-04T10:30:00.000Z",
        "endTime": "2025-06-04T11:30:00.000Z",
        "energyAmount": 45,
        "cost": 67500
      }
    ],
    "totalDistance": 150.5,
    "estimatedTravelTime": 180,
    "totalCost": 67500
  }
}
```

### Vehicle Status Update
```json
{
  "type": "VEHICLE_STATUS",
  "payload": {
    "currentLocation": {
      "latitude": -6.200000,
      "longitude": 106.816666
    },
    "batteryLevel": 75,
    "isCharging": false,
    "currentSpeed": 60,
    "estimatedArrival": "2025-06-04T12:00:00.000Z",
    "nextChargingStation": {
      "stationId": "spklu-001",
      "stationName": "SPKLU Mall Taman Anggrek"
    }
  }
}
```

## 🧪 Testing

### Manual Testing Steps:
1. Jalankan mock server: `npm run mock-server`
2. Jalankan aplikasi: `npm start`
3. Buka aplikasi di Expo Go
4. Pilih lokasi asal dan tujuan
5. Tap "Start Trip Planning"
6. Verifikasi response route dan jadwal pengisian
7. Lihat simulasi pergerakan kendaraan di peta

## 🚀 Deployment

### Android APK Build
```bash
expo build:android
```

### iOS IPA Build  
```bash
expo build:ios
```

### Expo Publish
```bash
expo publish
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

## 📝 Todo / Improvements

- [ ] Implementasi offline mode dengan cached data
- [ ] Push notifications untuk status charging
- [ ] Unit tests dan integration tests
- [ ] Error handling yang lebih robust
- [ ] Internationalization (i18n)
- [ ] Dark mode theme
- [ ] Performance optimization
- [ ] Accessibility improvements

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat GitHub issue atau hubungi tim development.

## 📄 License

[Specify your license here]

---

**Dibuat dengan ❤️ menggunakan Expo React Native**
