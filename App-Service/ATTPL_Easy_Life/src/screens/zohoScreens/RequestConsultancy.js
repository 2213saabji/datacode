import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

const RequestConsultancy = () => {
  const zohoFormUrl =
    'https://forms.zohopublic.in/ashokatodaytechnologyprivate/form/RequestConsultancy1/formperma/Yh_ei21OEAhU4SJe9TFn3TZMi9F4a1PoOQ6tH4l7ddM?zf_rszfm=1';

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: zohoFormUrl}}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default RequestConsultancy;
