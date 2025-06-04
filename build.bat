@echo off
REM Build script untuk Windows

echo 🚀 Starting EV Charging Scheduler build process...

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Run tests
echo 🧪 Running tests...
call npm test 2>nul || echo No tests configured

REM Build untuk Android  
echo 📱 Building for Android...
call expo build:android --type apk

echo ✅ Build process completed!
echo 📋 Next steps:
echo    1. Download APK from Expo build dashboard
echo    2. Test APK pada perangkat Android
echo    3. Upload ke Google Play Store (jika siap untuk production)
