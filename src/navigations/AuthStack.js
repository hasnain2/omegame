

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ForgotPassword, Login, Signup } from '../screens';

const Stack = createStackNavigator();
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={Signup} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    );
};

export { AuthStack };
