import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme/theme';
import { ActivityIndicator, View } from 'react-native';

// Placeholder Screens
import SplashScreen from '../screens/Auth/SplashScreen';
import LandingScreen from '../screens/Auth/LandingScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import TraderDashboard from '../screens/Trader/TraderDashboard';
import AdminDashboard from '../screens/Admin/AdminDashboard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TraderStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TraderDashboard" component={TraderDashboard} />
        {/* Add other trader screens here */}
    </Stack.Navigator>
);

const AdminStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        {/* Add other admin screens here */}
    </Stack.Navigator>
);

const AuthStack = () => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
    >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
);

export default function AppNavigator() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer theme={theme}>
            {user ? (
                user.role === 'admin' ? <AdminStack /> : <TraderStack />
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
}
