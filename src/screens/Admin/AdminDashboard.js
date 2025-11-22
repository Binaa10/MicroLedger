import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme/theme';

export default function AdminDashboard({ navigation }) {
    const { user, logout } = useAuth();

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <View>
                    <Text variant="titleLarge">Admin Portal</Text>
                    <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>System Overview</Text>
                </View>
                <Button mode="text" onPress={logout}>Logout</Button>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Card style={styles.mainCard}>
                    <Card.Content>
                        <Text variant="titleMedium">Total Traders</Text>
                        <Text variant="displaySmall">0</Text>
                    </Card.Content>
                </Card>

                <View style={styles.grid}>
                    <Card style={styles.gridCard}>
                        <Card.Content>
                            <Text variant="labelLarge">Pending IOUs</Text>
                            <Text variant="headlineSmall">0</Text>
                        </Card.Content>
                    </Card>
                    <Card style={styles.gridCard}>
                        <Card.Content>
                            <Text variant="labelLarge">System Logs</Text>
                            <Text variant="headlineSmall">0</Text>
                        </Card.Content>
                    </Card>
                </View>

                <Button mode="contained" style={styles.manageBtn} icon="account-group">
                    Manage Traders
                </Button>
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    content: {
        paddingBottom: 20,
    },
    mainCard: {
        backgroundColor: theme.colors.primaryContainer,
        marginBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    gridCard: {
        width: '48%',
    },
    manageBtn: {
        marginTop: 10,
    },
});
