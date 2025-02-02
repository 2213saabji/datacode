import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

/**
 * AboutScreen component.
 *
 * This screen provides information about the application, including its version and some descriptive text.
 * It also includes a header component for navigation.
 *
 * @returns {React.Element} - The AboutScreen element.
 *
 * @author PRATHAMESH GHORPADE
 */
const AboutScreen = () => {
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  return (
    <>
      <Header
        navigation={navigation}
        colors={colors}
        fonts={fonts}
        title="About"
      />
      <ScrollView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.content}>
          <Text
            style={[styles.text, {color: colors.text, ...fonts.bodyRegular}]}>
            Version 1.0.0
          </Text>
          <Text
            style={[styles.text, {color: colors.text, ...fonts.bodyRegular}]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            convallis libero at purus efficitur, sit amet lobortis arcu iaculis.
            Fusce porttitor feugiat magna, ac tincidunt nisi hendrerit ac. Sed
            nec eros vitae urna semper dictum in sed velit. Curabitur feugiat
            magna vitae turpis maximus fringilla. Aenean in pharetra odio.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Maecenas ac volutpat nulla.
          </Text>
          <Text
            style={[styles.text, {color: colors.text, ...fonts.bodyRegular}]}>
            Donec auctor ipsum velit, sed malesuada quam rhoncus et. Mauris in
            risus velit. Integer sit amet tortor eget nunc ultrices accumsan non
            sit amet erat. Aliquam ut lacinia erat. Nam vel tortor vitae libero
            mollis efficitur. Nulla facilisi. Aenean et leo vitae justo suscipit
            placerat. Sed elementum sem nec dolor ullamcorper, eget bibendum
            odio pretium.
          </Text>
          {/* Add more sections as needed */}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    paddingBottom: 24,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});

export default AboutScreen;
