import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const AppLoadingView = ({ }) => {
    return (
        <View style={{ justifyContent: 'center', zIndex: 10, alignItems: 'center', position: 'absolute', right: 0, top: 0, bottom: 0, left: 0 }}>
            <ActivityIndicator size={'large'} color={"white"} />
        </View>
    );
};

export { AppLoadingView };