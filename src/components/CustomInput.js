import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { theme } from '../theme/theme';

export default function CustomInput({ style, ...props }) {
    return (
        <TextInput
            mode="outlined"
            style={[styles.input, style]}
            outlineColor={theme.colors.outline}
            activeOutlineColor={theme.colors.primary}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 12,
        backgroundColor: theme.colors.surface,
    },
});
