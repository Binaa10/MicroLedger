import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { theme } from '../theme/theme';

export default function ScreenWrapper({ children, style }) {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
            <View style={styles.content}>
                {children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        padding: 16,
    },
});
