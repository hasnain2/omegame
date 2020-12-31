import React from 'react';
import { View } from 'react-native';
import { AppText } from './AppText';

const AppNoDataFound = ({ msg }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <AppText size={2} color={"grey"}>{msg ? msg : "No Data Found"}</AppText>
        </View>
    );
};

export { AppNoDataFound };
