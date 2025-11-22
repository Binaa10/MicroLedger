import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { theme } from '../theme/theme';

export default function CustomButton({ mode = 'contained', style, children, ...props }) {
    return (
        <Button
            mode={mode}
            style={[styles.button, style]}
            contentStyle={styles.content}
            {...props}
        >
            {children}
        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: theme.roundness,
        marginVertical: 8,
    },
    content: {
        paddingVertical: 6,
    },
});
