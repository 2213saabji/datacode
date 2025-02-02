import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import {
  Button,
  Portal,
  Dialog,
  RadioButton,
  TouchableRipple,
} from 'react-native-paper';
import { TextComponent } from './DialogTextComponent';


const DialogWithRadioBtns = ({ visible, close, setSortOrder, sortOrder }) => {
  const [checked, setChecked] = useState(sortOrder);
  const {colors, fonts} = useSelector(selectTheme);
  

const handleSelectOrder = () => {
  close(false);
  setSortOrder(checked);
}
  return (
    <Portal>
      <Dialog onDismiss={close} visible={visible}  >
        <Dialog.Title>Choose an option</Dialog.Title>
        <Dialog.ScrollArea style={styles.container}>
          <ScrollView>
            <View>
              <TouchableRipple onPress={() => setChecked('latest')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton
                      value="latest"
                      status={checked === 'latest' ? 'checked' : 'unchecked'}
                    />
                  </View>
                  <TextComponent isSubheading style={styles.text}>
                    Latest
                  </TextComponent>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => setChecked('oldest')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton
                      value="oldest"
                      status={checked === 'oldest' ? 'checked' : 'unchecked'}
                    />
                  </View>
                  <TextComponent isSubheading style={styles.text}>
                    Oldest
                  </TextComponent>
                </View>
              </TouchableRipple>
            </View>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={() => close(false)}>Cancel</Button>
          <Button onPress={handleSelectOrder}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogWithRadioBtns;

const styles = StyleSheet.create({
  container: {
    maxHeight: 170,
    paddingHorizontal: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    paddingLeft: 8,
  },
});
