import React, {useState, useRef} from 'react';
import {WebView} from 'react-native-webview';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const createWebViewComponent = (url, name) => {
  return () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const webViewRef = useRef(null);

    const handleLoadStart = () => setIsLoading(true);
    const handleLoadEnd = () => setIsLoading(false);
    const handleLoadError = syntheticEvent => {
      const {nativeEvent} = syntheticEvent;
      setError(nativeEvent.description);
      setIsLoading(false);
    };

    const goBack = () => webViewRef.current.goBack();
    const goForward = () => webViewRef.current.goForward();
    const reload = () => webViewRef.current.reload();

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.headerButton}>
            <Icon name="chevron-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{name}</Text>
          <TouchableOpacity onPress={reload} style={styles.headerButton}>
            <Icon name="refresh" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
        <WebView
          ref={webViewRef}
          source={{uri: url}}
          style={styles.webview}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleLoadError}
        />
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Loading {name}...</Text>
          </View>
        )}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
            <TouchableOpacity onPress={reload} style={styles.reloadButton}>
              <Text style={styles.reloadButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  };
};

export const ConsultancyWebView = createWebViewComponent(
  'https://attplconsultancy.com/',
  'Consultancy',
);
export const InfraWebView = createWebViewComponent(
  'https://attplconsultancy.com/',
  'Infra',
);
export const SolarWebView = createWebViewComponent(
  'https://attplsolar.com/',
  'Solar',
);
export const FinanceWebView = createWebViewComponent(
  'https://attplfinance.com/',
  'Finance',
);
export const ITWebView = createWebViewComponent('https://attplit.com/', 'IT');
export const StoneWebView = createWebViewComponent(
  'https://attplstone.com/',
  'Stone',
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333333',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  reloadButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  reloadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
