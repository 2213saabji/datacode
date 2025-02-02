import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/selectors';

import MailForm from '../../components/MailForm/mail_form';

// ----------------------------------------------------------------------

export default function MailFormView({ route, navigation }) {
    const { colors, fonts } = useSelector(selectTheme);

    const complainMailId = route?.params?.complainMailId;
    const complainMailDetails = route?.params?.complainMailDetails;

    const { height: screenHeight } = Dimensions.get('window');

    return (
        <>
            <SafeAreaView
                style={[styles.safeArea, { backgroundColor: colors.background }]}>
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollViewContent,
                        { minHeight: screenHeight },
                    ]}>

                    <View style={styles.container}>
                        <Text style={{ color: colors.text, marginBottom: 10, ...fonts.titleLarge }}>COMPLAINT REGISTER VIA MAIL CHANNEL</Text>
                        <MailForm complainMailDetails={complainMailDetails} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        padding: 16,
    },
});
