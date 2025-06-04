const { getDefaultConfig } = require('expo/metro-config');
const exclusionList = require("metro-config/src/defaults/exclusionList");

const config = getDefaultConfig(__dirname);

// Enable web platform
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Add platform-specific file extensions
config.resolver.sourceExts.push('web.js', 'web.jsx', 'web.ts', 'web.tsx');

// Platform-specific resolution for web
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Exclude react-native-maps from web bundle
config.resolver.blockList = exclusionList([
      // regex di sini jika ingin blacklist folder/file
      /node_modules\/.*\/node_modules\/react-native\/.*/,
    ])

// Platform-specific alias
config.resolver.alias = {
  ...config.resolver.alias,
  'react-native-maps': {
    web: require.resolve('./src/components/MapView.web.tsx'),
    default: 'react-native-maps',
  },
};

module.exports = config;
