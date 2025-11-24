import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { theme } from '../../theme/theme';

/**
 * FullScreenLoader - A full-screen loading overlay
 * Use this for blocking operations like login, data sync, etc.
 * 
 * @param {boolean} visible - Controls visibility of the loader
 * @param {string} message - Optional message to display below the spinner
 */
export default function FullScreenLoader({ visible = false, message = 'Loading...' }) {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ActivityIndicator
                        size="large"
                        color={theme.colors.primary}
                        style={styles.spinner}
                    />
                    {message && (
                        <Text variant="bodyLarge" style={styles.message}>
                            {message}
                        </Text>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.roundness * 2,
        padding: 32,
        alignItems: 'center',
        minWidth: 200,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    spinner: {
        marginBottom: 16,
    },
    message: {
        color: theme.colors.text,
        textAlign: 'center',
    },
});
