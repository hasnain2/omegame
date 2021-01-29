
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CodeVerification, ForgotPassword, Login, ResetPassword, SetUserName, Signup } from '../screens';

const Stack = createStackNavigator();
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={Signup} />
            <Stack.Screen name="SetUserName" component={SetUserName} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="CodeVerification" component={CodeVerification} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
    );
};

export { AuthStack };
