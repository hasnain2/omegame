import React from 'react';
import {View} from 'react-native';
import {AppBackButton} from '../../components';
import {WebView} from 'react-native-webview';
const PaymentWebView = ({navigation, route}) => {
  const url = route.params.url;
  return (
    <>
      <View style={{backgroundColor: 'black'}}>
        <AppBackButton
          navigation={navigation}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <WebView source={{uri: url}} style={{backgroundColor: 'black'}} />
    </>
  );
};
export {PaymentWebView};
