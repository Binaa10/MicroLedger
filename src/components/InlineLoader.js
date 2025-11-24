import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { theme } from '../../theme/theme';

/**
 * InlineLoader - A compact inline loading indicator
 * Use this for loading states within components (e.g., loading list items)
 * 
 * @param {string} message - Optional message to display next to the spinner
 * @param {string} size - Size of the spinner: 'small' | 'large'
 */
export default function InlineLoader({ message = '', size = 'small' }) {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                size={size}
                color={theme.colors.primary}
                style={styles.spinner}
            />
            {message && (
                <Text variant="bodyMedium" style={styles.message}>
                    {message}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    spinner: {
        marginRight: 12,
    },
    message: {
        color: theme.colors.text,
    },
});
