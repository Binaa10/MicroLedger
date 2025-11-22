import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00695C', // Deep Teal
    secondary: '#004D40', // Darker Teal
    accent: '#FFC107', // Amber for highlights
    background: '#F5F5F5', // Light Grey background
    surface: '#FFFFFF', // White surface
    text: '#212121', // Dark Grey text
    error: '#B00020',
    success: '#4CAF50',
    warning: '#FF9800',
  },
  roundness: 8,
};
