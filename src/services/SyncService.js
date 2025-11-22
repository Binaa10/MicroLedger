import axios from 'axios';
import { getDB } from '../database/db';

const API_URL = 'https://api.example.com'; // Placeholder

export const SyncService = {
    pushChanges: async () => {
        const db = getDB();
        try {
            // 1. Get unsynced transactions
            const transactions = db.getAllSync('SELECT * FROM transactions WHERE is_synced = 0');

            // 2. Get unsynced IOUs
            const ious = db.getAllSync('SELECT * FROM ious WHERE is_synced = 0');

            if (transactions.length === 0 && ious.length === 0) {
                return { success: true, message: 'Nothing to sync' };
            }

            // 3. Push to backend (Mocked)
            // await axios.post(`${API_URL}/sync`, { transactions, ious });

            console.log('Pushing changes:', { transactions, ious });

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 4. Mark as synced
            db.runSync('UPDATE transactions SET is_synced = 1 WHERE is_synced = 0');
            db.runSync('UPDATE ious SET is_synced = 1 WHERE is_synced = 0');

            return { success: true, count: transactions.length + ious.length };
        } catch (error) {
            console.error('Sync error:', error);
            return { success: false, error };
        }
    },

    pullChanges: async () => {
        // Placeholder for pulling data
        return { success: true };
    }
};
