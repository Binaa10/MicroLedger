import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { Text, Button } from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import { theme } from '../../theme/theme';

export default function LandingScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <ScreenWrapper style={styles.container}>
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                {/* Logo Section */}
                <View style={styles.logoSection}>
                    <Image
                        source={require('../../../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text variant="displaySmall" style={styles.appName}>
                        MicroLedger
                    </Text>
                    <Text variant="titleMedium" style={styles.tagline}>
                        Offline-First Trading Made Simple
                    </Text>
                </View>

                {/* Hero Illustration */}
                <View style={styles.heroSection}>
                    <Image
                        source={require('../../../assets/hero.png')}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Features */}
                <View style={styles.featuresSection}>
                    <Text variant="bodyMedium" style={styles.featureText}>
                        ✓ Track transactions offline
                    </Text>
                    <Text variant="bodyMedium" style={styles.featureText}>
                        ✓ Sync when connected
                    </Text>
                    <Text variant="bodyMedium" style={styles.featureText}>
                        ✓ Secure & reliable
                    </Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonSection}>
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate('Signup')}
                        style={styles.primaryButton}
                        contentStyle={styles.buttonContent}
                    >
                        Get Started
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={() => navigation.navigate('Login')}
                        style={styles.secondaryButton}
                        contentStyle={styles.buttonContent}
                    >
                        Login
                    </Button>
                </View>
            </Animated.View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 40,
    },
    logoSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 16,
    },
    appName: {
        color: theme.colors.primary,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    tagline: {
        color: theme.colors.secondary,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    heroSection: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 20,
    },
    heroImage: {
        width: '80%',
        height: 200,
    },
    featuresSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    featureText: {
        color: theme.colors.text,
        marginVertical: 4,
        fontSize: 16,
    },
    buttonSection: {
        width: '100%',
        gap: 12,
    },
    primaryButton: {
        borderRadius: theme.roundness,
    },
    secondaryButton: {
        borderRadius: theme.roundness,
        borderColor: theme.colors.primary,
    },
    buttonContent: {
        paddingVertical: 8,
    },
});
