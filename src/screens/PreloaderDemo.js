import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import FullScreenLoader from '../../components/FullScreenLoader';
import InlineLoader from '../../components/InlineLoader';
import SkeletonLoader from '../../components/SkeletonLoader';
import SyncLoader from '../../components/SyncLoader';
import { theme } from '../../theme/theme';

/**
 * PreloaderDemo - Demo screen showcasing all preloader components
 * This screen demonstrates how to use each preloader component
 */
export default function PreloaderDemo() {
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [showSync, setShowSync] = useState(false);

    const handleFullScreenDemo = () => {
        setShowFullScreen(true);
        setTimeout(() => setShowFullScreen(false), 3000);
    };

    const handleSyncDemo = () => {
        setShowSync(true);
        setTimeout(() => setShowSync(false), 5000);
    };

    return (
        <ScreenWrapper>
            <ScrollView style={styles.container}>
                <Text variant="headlineMedium" style={styles.title}>
                    Preloader Components Demo
                </Text>

                {/* FullScreenLoader Demo */}
                <View style={styles.section}>
                    <Text variant="titleLarge" style={styles.sectionTitle}>
                        1. FullScreenLoader
                    </Text>
                    <Text variant="bodyMedium" style={styles.description}>
                        Use for blocking operations like login, data sync, etc.
                    </Text>
                    <Button
                        mode="contained"
                        onPress={handleFullScreenDemo}
                        style={styles.button}
                    >
                        Show FullScreen Loader (3s)
                    </Button>
                </View>

                <Divider style={styles.divider} />

                {/* InlineLoader Demo */}
                <View style={styles.section}>
                    <Text variant="titleLarge" style={styles.sectionTitle}>
                        2. InlineLoader
                    </Text>
                    <Text variant="bodyMedium" style={styles.description}>
                        Use for loading states within components
                    </Text>
                    <View style={styles.demoBox}>
                        <InlineLoader message="Loading data..." size="small" />
                        <InlineLoader message="Processing..." size="large" />
                    </View>
                </View>

                <Divider style={styles.divider} />

                {/* SkeletonLoader Demo */}
                <View style={styles.section}>
                    <Text variant="titleLarge" style={styles.sectionTitle}>
                        3. SkeletonLoader
                    </Text>
                    <Text variant="bodyMedium" style={styles.description}>
                        Use to show placeholder content while data is being fetched
                    </Text>
                    <View style={styles.demoBox}>
                        <SkeletonLoader lines={3} height={20} />
                        <SkeletonLoader lines={5} height={15} />
                    </View>
                </View>

                <Divider style={styles.divider} />

                {/* SyncLoader Demo */}
                <View style={styles.section}>
                    <Text variant="titleLarge" style={styles.sectionTitle}>
                        4. SyncLoader
                    </Text>
                    <Text variant="bodyMedium" style={styles.description}>
                        Use to show sync/refresh operations in progress
                    </Text>
                    <Button
                        mode="contained"
                        onPress={handleSyncDemo}
                        style={styles.button}
                    >
                        Show Sync Loader (5s)
                    </Button>
                    <SyncLoader
                        syncing={showSync}
                        message="Syncing transactions..."
                        onCancel={() => setShowSync(false)}
                    />
                </View>

                {/* Usage Examples */}
                <View style={styles.section}>
                    <Text variant="titleLarge" style={styles.sectionTitle}>
                        Usage Examples
                    </Text>
                    <Text variant="bodySmall" style={styles.codeText}>
                        {`// FullScreenLoader\n<FullScreenLoader visible={isLoading} message="Logging in..." />\n\n// InlineLoader\n<InlineLoader message="Loading..." size="small" />\n\n// SkeletonLoader\n<SkeletonLoader lines={3} height={20} />\n\n// SyncLoader\n<SyncLoader syncing={isSyncing} message="Syncing..." />`}
                    </Text>
                </View>
            </ScrollView>

            {/* FullScreenLoader Component */}
            <FullScreenLoader
                visible={showFullScreen}
                message="This is a full-screen loader..."
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: theme.colors.primary,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        color: theme.colors.primary,
        marginBottom: 8,
        fontWeight: '600',
    },
    description: {
        color: theme.colors.text,
        marginBottom: 12,
        lineHeight: 20,
    },
    button: {
        marginTop: 8,
        borderRadius: theme.roundness,
    },
    demoBox: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.roundness,
        padding: 16,
        marginTop: 8,
    },
    divider: {
        marginVertical: 16,
    },
    codeText: {
        fontFamily: 'monospace',
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: theme.roundness,
        marginTop: 8,
        lineHeight: 18,
    },
});
