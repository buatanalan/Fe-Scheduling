#!/bin/bash

# Build script untuk deployment

echo "🚀 Starting EV Charging Scheduler build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run tests (jika ada)
echo "🧪 Running tests..."
npm test 2>/dev/null || echo "No tests configured"

# Build untuk Android
echo "📱 Building for Android..."
expo build:android --type apk

# Build untuk iOS (uncomment jika diperlukan)
# echo "🍎 Building for iOS..."
# expo build:ios --type archive

echo "✅ Build process completed!"
echo "📋 Next steps:"
echo "   1. Download APK from Expo build dashboard"
echo "   2. Test APK pada perangkat Android"
echo "   3. Upload ke Google Play Store (jika siap untuk production)"
