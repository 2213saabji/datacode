import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

const JobApplicationForm = () => {
  const zohoFormUrl =
    'https://forms.zohopublic.in/ashokatodaytechnologyprivate/form/JobApplicationForm/formperma/-opI4SCwg70V7eDGMl7i2Dw9urIeB1aLhll0ctGOKdI?zf_rszfm=1';

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

export default JobApplicationForm;
