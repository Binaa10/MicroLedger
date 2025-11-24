import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '../../theme/theme';

/**
 * SkeletonLoader - Animated skeleton screen for content loading
 * Use this to show placeholder content while data is being fetched
 * 
 * @param {number} lines - Number of skeleton lines to display
 * @param {number} height - Height of each skeleton line
 */
export default function SkeletonLoader({ lines = 3, height = 20 }) {
    const pulseAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();

        return () => pulse.stop();
    }, []);

    const opacity = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <View style={styles.container}>
            {Array.from({ length: lines }).map((_, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.skeletonLine,
                        {
                            height,
                            opacity,
                            width: index === lines - 1 ? '70%' : '100%',
                        },
                    ]}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    skeletonLine: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.roundness,
        marginBottom: 12,
    },
});
