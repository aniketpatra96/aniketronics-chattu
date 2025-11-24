const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Allow Metro to follow symlinks created by pnpm and resolve package exports correctly.
config.resolver.unstable_enableSymlinks = undefined;
config.resolver.unstable_enablePackageExports = true;

module.exports = withNativeWind(config, { input: './global.css' });
