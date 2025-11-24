import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons, HelperText } from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme/theme';
import { getDB } from '../../database/db';

export default function SignupScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('trader');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        if (!username || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return false;
        }

        if (username.length < 3) {
            setError('Username must be at least 3 characters');
            return false;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSignup = async () => {
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            const db = getDB();

            // Check if username already exists
            const existingUser = db.getAllSync(
                'SELECT * FROM users WHERE username = ?',
                [username]
            );

            if (existingUser.length > 0) {
                setError('Username already exists');
                setIsLoading(false);
                return;
            }

            // Insert new user
            db.runSync(
                'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                [username, password, role]
            );

            setSuccess('Account created successfully! Redirecting to login...');

            // Clear form
            setUsername('');
            setPassword('');
            setConfirmPassword('');

            // Navigate to login after a short delay
            setTimeout(() => {
                navigation.navigate('Login');
            }, 1500);

        } catch (error) {
            console.error('Signup error:', error);
            setError('An error occurred during signup. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScreenWrapper style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.logoContainer}>
                    <Text variant="headlineLarge" style={styles.title}>Create Account</Text>
                    <Text variant="bodyLarge" style={styles.subtitle}>Join MicroLedger</Text>
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
                        onChangeText={(text) => {
                            setUsername(text);
                            setError('');
                        }}
                        mode="outlined"
                        style={styles.input}
                        autoCapitalize="none"
                        disabled={isLoading}
                    />

                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            setError('');
                        }}
                        mode="outlined"
                        secureTextEntry
                        style={styles.input}
                        disabled={isLoading}
                    />

                    <TextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                            setError('');
                        }}
                        mode="outlined"
                        secureTextEntry
                        style={styles.input}
                        disabled={isLoading}
                    />

                    {error ? <HelperText type="error">{error}</HelperText> : null}
                    {success ? <HelperText type="info" style={styles.successText}>{success}</HelperText> : null}

                    <Button
                        mode="contained"
                        onPress={handleSignup}
                        loading={isLoading}
                        disabled={isLoading}
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                    >
                        Sign Up
                    </Button>

                    <Button
                        mode="text"
                        onPress={() => navigation.navigate('Login')}
                        disabled={isLoading}
                        style={styles.loginButton}
                    >
                        Already have an account? Login
                    </Button>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20,
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
    loginButton: {
        marginTop: 10,
    },
    successText: {
        color: theme.colors.success,
    },
});
