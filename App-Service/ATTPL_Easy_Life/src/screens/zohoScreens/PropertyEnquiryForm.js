import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

const PropertyEnquiryForm = () => {
  const zohoFormUrl =
    'https://forms.zohopublic.in/ashokatodaytechnologyprivate/form/PropertyEnquiryForm/formperma/dZy806SoIco2uiXrM2AXtJVD0nDDf-tCRA4p-BLWWnU?zf_rszfm=1&zf_enablecamera=true';

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

export default PropertyEnquiryForm;
