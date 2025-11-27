import { registerRootComponent } from "expo";
import { Platform } from "react-native";
import App from "./App";

// Web fallback: disable WASM worker if bundler fails to load .wasm
if (Platform.OS === "web") {
  // If expo-sqlite can't resolve wasm worker, fall back to synchronous mode.
  // This prevents build crashes when .wasm is not resolved by the bundler.
  // Remove this if/when the wasm file resolves correctly.
  // @ts-ignore
  globalThis.__EXPO_SQLITE_DISABLE_WASM_WORKER = true;
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
