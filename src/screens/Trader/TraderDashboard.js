import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, FAB } from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme/theme';

export default function TraderDashboard({ navigation }) {
    const { user, logout } = useAuth();

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <View>
                    <Text variant="titleLarge">Hello, {user?.name}</Text>
                    <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>Trader Dashboard</Text>
                </View>
                <Button mode="text" onPress={logout}>Logout</Button>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.statsRow}>
                    <Card style={[styles.card, { backgroundColor: '#E0F2F1' }]}>
                        <Card.Content>
                            <Text variant="titleMedium">Today's Sales</Text>
                            <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>$0.00</Text>
                        </Card.Content>
                    </Card>
                    <Card style={[styles.card, { backgroundColor: '#FFEBEE' }]}>
                        <Card.Content>
                            <Text variant="titleMedium">Expenses</Text>
                            <Text variant="headlineMedium" style={{ color: theme.colors.error }}>$0.00</Text>
                        </Card.Content>
                    </Card>
                </View>

                <Card style={styles.actionCard}>
                    <Card.Title title="Quick Actions" />
                    <Card.Content style={styles.actionButtons}>
                        <Button mode="contained-tonal" icon="cash-plus" style={styles.actionBtn}>Sale</Button>
                        <Button mode="contained-tonal" icon="cash-minus" style={styles.actionBtn}>Expense</Button>
                        <Button mode="contained-tonal" icon="handshake" style={styles.actionBtn}>IOU</Button>
                    </Card.Content>
                </Card>

                <Text variant="titleMedium" style={styles.sectionTitle}>Recent Transactions</Text>
                {/* List placeholder */}
                <Card style={styles.transactionCard}>
                    <Card.Content>
                        <Text>No recent transactions.</Text>
                    </Card.Content>
                </Card>
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
        paddingBottom: 80,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        width: '48%',
    },
    actionCard: {
        marginBottom: 20,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    actionBtn: {
        marginBottom: 10,
        minWidth: '30%',
    },
    sectionTitle: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    transactionCard: {
        marginBottom: 10,
    },
});
