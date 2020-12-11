import React from 'react';
import { View } from 'react-native';
import { AppLoadingView } from '../../components';

const AuthLoading = () => (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
        <AppLoadingView />
    </View>
);

export { AuthLoading };