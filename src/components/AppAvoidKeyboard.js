import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
const AppAvoidKeyboard = ({ style, behavior, children }) => {
    return (
        <KeyboardAvoidingView style={[{ flex: 1 }, style ? style : null]}
            behavior={behavior ? behavior : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
            {children}
        </KeyboardAvoidingView>
    );
};

export { AppAvoidKeyboard };
