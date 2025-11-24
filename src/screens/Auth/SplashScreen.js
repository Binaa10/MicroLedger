import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { theme } from '../../theme/theme';

export default function SplashScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        // Fade in and scale animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();

        // Navigate to Landing after 2.5 seconds
        const timer = setTimeout(() => {
            navigation.replace('Landing');
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text variant="displaySmall" style={styles.appName}>
                    MicroLedger
                </Text>
                <Text variant="titleMedium" style={styles.subtitle}>
                    Offline-First Trading
                </Text>
                <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                    style={styles.loader}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 24,
    },
    appName: {
        color: theme.colors.primary,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        color: theme.colors.secondary,
        marginBottom: 40,
    },
    loader: {
        marginTop: 20,
    },
});
