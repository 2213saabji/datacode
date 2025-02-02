import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';

const HelpScreen = () => {
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  const openExternalLink = link => {
    Linking.openURL(link);
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.surface} />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            {color: colors.surface, ...fonts.titleMedium},
          ]}>
          Help
        </Text>
        <View style={{width: 24}} />
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.item, {backgroundColor: colors.surface}]}
          onPress={() =>
            openExternalLink(
              'https://api.whatsapp.com/send?phone=9553954206',
            )
          }>
          <Ionicons name="logo-whatsapp" size={24} color={colors.primary} />
          <Text
            style={[
              styles.itemText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            WhatsApp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.item, {backgroundColor: colors.surface}]}
          onPress={() => openExternalLink('mailto:rakesh.reddy@attplgroup.com')}>
          <Ionicons name="mail-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.itemText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.item, {backgroundColor: colors.surface}]}
          onPress={() => openExternalLink('tel:+91 9553954206')}>
          <Ionicons name="call-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.itemText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Call
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.item, {backgroundColor: colors.surface}]}
          onPress={() => openExternalLink('sms:+91 9553954206')}>
          <Ionicons name="chatbox-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.itemText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            SMS
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[styles.item, {backgroundColor: colors.surface}]}
          onPress={() => navigation.navigate('Chat')}>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={colors.primary}
          />
          <Text
            style={[
              styles.itemText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Chat
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    marginLeft: 16,
    fontSize: 16,
  },
});

export default HelpScreen;
