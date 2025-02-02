import React from 'react';
import {Appbar, IconButton} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {selectTheme} from '../../redux/selectors';

import {useSelector} from 'react-redux';

const Header = ({navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);

  return (
    <Appbar.Header style={{backgroundColor: colors.surface}}>
      <Appbar.Content
        title="Notifications"
        titleStyle={{
          color: colors.text,
          fontFamily: fonts.titleLarge.fontFamily,
        }}
      />
      <IconButton icon="check-circle-outline" iconColor={colors.text} />
      <IconButton
        icon="close"
        iconColor={colors.text}
        onPress={() => navigation.goBack()}
      />
    </Appbar.Header>
  );
};

export default Header;
