import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const AttplBuySellCrops = () => {
    const zohoFormUrl =
        'https://forms.zohopublic.in/ashokatodaytechnologyprivate/form/FARMERSFORM/formperma/dV_XzMgZ-4sfqb8ugR9p_27y6n5J9G0-pr2-G3yA_ug?zf_rszfm=1&zf_enablecamera=true';

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: zohoFormUrl }}
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

export default AttplBuySellCrops;
