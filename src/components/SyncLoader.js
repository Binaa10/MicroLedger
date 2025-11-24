import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { theme } from '../../theme/theme';

/**
 * SyncLoader - Sync operation indicator with rotating icon
 * Use this to show sync/refresh operations in progress
 * 
 * @param {boolean} syncing - Whether sync is in progress
 * @param {string} message - Message to display during sync
 * @param {function} onCancel - Optional callback to cancel sync
 */
export default function SyncLoader({ syncing = false, message = 'Syncing...', onCancel }) {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (syncing) {
            const rotation = Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                })
            );
            rotation.start();

            return () => rotation.stop();
        } else {
            rotateAnim.setValue(0);
        }
    }, [syncing]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    if (!syncing) return null;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Animated.View style={{ transform: [{ rotate }] }}>
                    <IconButton
                        icon="sync"
                        iconColor={theme.colors.primary}
                        size={24}
                    />
                </Animated.View>
                <Text variant="bodyMedium" style={styles.message}>
                    {message}
                </Text>
                {onCancel && (
                    <IconButton
                        icon="close"
                        iconColor={theme.colors.error}
                        size={20}
                        onPress={onCancel}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.roundness,
        padding: 12,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        color: theme.colors.text,
        marginLeft: 8,
        flex: 1,
    },
});
