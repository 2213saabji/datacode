import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({navigation, colors, fonts,setting,text,backNavigation}) => (
  <View style={[styles.header, {backgroundColor: colors.primary}]}>
    <View style={styles.headerLeadings}>
      <TouchableOpacity onPress={() => backNavigation? navigation.navigate(backNavigation) : navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={colors.surface} />
      </TouchableOpacity>
      <Text
        style={[
          styles.headerTitle,
          {color: colors.surface, ...fonts.titleMedium},
        ]}>
        {text?text:"Settings"}
      </Text>
    </View>
    
    {setting==null?"":<TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="settings-outline" size={24} color={colors.surface} />
    </TouchableOpacity>}
  </View>
);

const styles = {
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeadings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
};

export default Header;
