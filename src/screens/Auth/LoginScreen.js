import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons, HelperText } from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme/theme';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('trader');
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        // For prototype: Auto-switch role based on selection if using mock data
        // In real app, the backend/DB defines the role.
        // Here we just pass credentials to AuthContext
        const result = await login(username, password);
        if (!result.success) {
            setError(result.message);
        }
    };

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.logoContainer}>
                <Text variant="headlineLarge" style={styles.title}>MicroLedger</Text>
                <Text variant="bodyLarge" style={styles.subtitle}>Offline-First Trading</Text>
            </View>

            <View style={styles.form}>
                <SegmentedButtons
                    value={role}
                    onValueChange={setRole}
                    buttons={[
                        { value: 'trader', label: 'Trader' },
                        { value: 'admin', label: 'Admin' },
                    ]}
                    style={styles.roleSwitch}
                />

                <TextInput
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                    mode="outlined"
                    style={styles.input}
                    autoCapitalize="none"
                />

                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                />

                {error ? <HelperText type="error">{error}</HelperText> : null}

                <Button
                    mode="contained"
                    onPress={handleLogin}
                    loading={isLoading}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                >
                    Login
                </Button>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    subtitle: {
        color: theme.colors.secondary,
    },
    form: {
        width: '100%',
    },
    roleSwitch: {
        marginBottom: 20,
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 10,
        borderRadius: theme.roundness,
    },
    buttonContent: {
        paddingVertical: 6,
    },
});
