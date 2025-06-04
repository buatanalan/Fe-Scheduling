# Testing Checklist - EV Charging Scheduler

## 📋 Pre-Testing Setup

### Requirements
- [ ] Mock server running (`npm run mock-server`)
- [ ] Expo development server running (`npm start`)
- [ ] Device/emulator connected
- [ ] Internet connection available

### Environment Check
- [ ] Node.js version >= 18
- [ ] Expo CLI installed
- [ ] All dependencies installed (`npm install`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)

## 🧪 Functional Testing

### 1. App Launch & Navigation
- [ ] App launches without crashes
- [ ] Home screen displays correctly
- [ ] Navigation between screens works
- [ ] Status bar configured properly
- [ ] Loading states display correctly

### 2. Location Input Testing
- [ ] GPS location picker opens
- [ ] Current location detected accurately
- [ ] Address geocoding works (lat/lng to address)
- [ ] Manual address input works
- [ ] Location validation works
- [ ] Error handling for location services

### 3. WebSocket Communication
- [ ] Connection establishes on app start
- [ ] Connection status indicator accurate
- [ ] Trip request sent successfully
- [ ] Route response received and parsed
- [ ] Vehicle status updates received
- [ ] Reconnection works after network loss
- [ ] Error handling for connection failures

### 4. Trip Planning Flow
- [ ] Origin location can be set
- [ ] Destination location can be set
- [ ] "Start Trip Planning" button enabled when both locations set
- [ ] Loading indicator shows during request
- [ ] Navigation to Route screen works
- [ ] Data passed correctly between screens

### 5. Route Screen - Map Tab
- [ ] Map loads and displays correctly
- [ ] Route polyline displayed
- [ ] Origin marker (green) displayed
- [ ] Destination marker (red) displayed
- [ ] Charging station markers (blue) displayed
- [ ] Vehicle location marker (orange) displayed
- [ ] Map region fits all markers
- [ ] Marker info windows show correct data
- [ ] Map controls (zoom, pan) work

### 6. Route Screen - Schedule Tab
- [ ] Charging schedule list displays
- [ ] Station information correct
- [ ] Time formatting correct (HH:MM format)
- [ ] Currency formatting correct (IDR)
- [ ] Energy amount displayed (kWh)
- [ ] Port number displayed
- [ ] Station address displayed

### 7. Vehicle Status Updates
- [ ] Real-time location updates
- [ ] Battery level updates
- [ ] Speed updates
- [ ] Charging status updates
- [ ] ETA calculations
- [ ] Status card UI updates correctly

### 8. UI/UX Testing
- [ ] Tab switching smooth (Map ↔ Schedule)
- [ ] Scroll performance good
- [ ] Touch targets appropriate size
- [ ] Loading states user-friendly
- [ ] Error messages clear and helpful
- [ ] Typography readable
- [ ] Colors consistent with design
- [ ] Icons display correctly

## 📱 Platform-Specific Testing

### Android Testing
- [ ] App installs correctly
- [ ] Permissions requested properly (Location)
- [ ] Back button behavior correct
- [ ] Hardware back button works
- [ ] App runs on different screen sizes
- [ ] Performance acceptable

### iOS Testing
- [ ] App installs correctly
- [ ] Permissions requested properly (Location)
- [ ] Safe area handling correct
- [ ] Navigation gestures work
- [ ] App runs on different screen sizes
- [ ] Performance acceptable

## 🔧 Technical Testing

### Performance
- [ ] App startup time < 3 seconds
- [ ] Map rendering smooth
- [ ] List scrolling smooth (60fps)
- [ ] Memory usage reasonable
- [ ] No memory leaks detected
- [ ] WebSocket reconnection fast

### Error Scenarios
- [ ] No internet connection
- [ ] WebSocket server down
- [ ] Invalid location data
- [ ] GPS services disabled
- [ ] App backgrounding/foregrounding
- [ ] Network switching (WiFi ↔ Mobile)

### Data Validation
- [ ] Location coordinates valid range
- [ ] Currency amounts positive
- [ ] Time stamps valid format
- [ ] Energy amounts reasonable
- [ ] Station IDs not empty
- [ ] Network request timeouts

## 🌐 Localization Testing

### Indonesian Locale
- [ ] Currency format: Rp 67.500
- [ ] Date format: DD/MM/YYYY
- [ ] Time format: HH:MM
- [ ] Distance units: km, m
- [ ] Speed units: km/h
- [ ] Number formatting: 1.234,56

## 🔒 Security Testing

### Data Protection
- [ ] No sensitive data in logs
- [ ] WebSocket messages encrypted (if required)
- [ ] Location data handled securely
- [ ] No hardcoded credentials
- [ ] Environment variables used correctly

## 🚀 Deployment Testing

### Build Process
- [ ] Android APK builds successfully
- [ ] iOS IPA builds successfully
- [ ] Web build works (if applicable)
- [ ] App size reasonable
- [ ] All assets included
- [ ] Release configuration correct

### Production Environment
- [ ] Production WebSocket URL configured
- [ ] Google Maps API key configured
- [ ] Environment variables set
- [ ] Performance monitoring setup
- [ ] Crash reporting configured

## 📊 Test Results Documentation

### Test Execution
Date: ________________
Tester: ________________
Environment: ________________
Device: ________________

### Pass/Fail Summary
- Total Tests: ______
- Passed: ______
- Failed: ______
- Skipped: ______

### Critical Issues Found
1. _________________________________
2. _________________________________
3. _________________________________

### Recommendations
1. _________________________________
2. _________________________________
3. _________________________________

### Sign-off
Tested by: ________________
Date: ________________
Approved for release: [ ] Yes [ ] No

---

## 📝 Notes

- Test pada berbagai ukuran layar
- Test dengan koneksi internet yang lambat
- Test dengan level baterai rendah
- Test dengan aplikasi lain berjalan di background
- Test dengan notifikasi masuk selama penggunaan

## 🔄 Regression Testing

Setelah bug fixes atau new features:
- [ ] Re-run critical path tests
- [ ] Verify existing functionality not broken
- [ ] Test new features thoroughly
- [ ] Update test cases if needed
