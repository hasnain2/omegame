import React, {useState} from 'react';
import {View} from 'react-native';
import {AppBackButton} from '../../components';
import {WebView} from 'react-native-webview';
import {AppLoadingView} from '../../components';
const PaymentWebView = ({navigation, route}) => {
  const url = route.params.url;
  const [loading, setLoading] = useState(true);
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
      <WebView source={{uri: url}} style={{backgroundColor: 'black'}} onLoad={() => setLoading(false)} />
      {loading && <AppLoadingView />}
    </>
  );
};
export {PaymentWebView};
