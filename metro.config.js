const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
// Ensure wasm files are treated as assets so they can be resolved.
if (!config.resolver.assetExts.includes("wasm")) {
  config.resolver.assetExts.push("wasm");
}

module.exports = config;
