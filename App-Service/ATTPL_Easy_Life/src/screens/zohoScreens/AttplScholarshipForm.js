import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

const AttplScholarshipForm = () => {
  const zohoFormUrl =
    'https://forms.zohopublic.in/ashokatodaytechnologyprivate/form/ScholarshipApplication/formperma/2BqktYX4W4aIM2GpfR34BtOlEiGUFWUFCIuwHHiKDYQ?zf_rszfm=1';

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

export default AttplScholarshipForm;
