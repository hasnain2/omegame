import React from 'react';
import {View, Text} from 'react-native';
const PaymentWebView = ({route}) => {
  const url = route.params.url;
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};
export {PaymentWebView};
