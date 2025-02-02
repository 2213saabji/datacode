import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/selectors';
import {
  Button,
  Portal,
  Dialog,
  RadioButton,
  TouchableRipple,
} from 'react-native-paper';
import { TextComponent } from './DialogTextComponent';

const DialogWithRadioBtns = ({
  visible,
  close,
  options, // Array of options to display
  selectedOption, // The currently selected option
  onSelect, // Callback function to handle selection
  title = 'Choose an option', // Optional title, defaults to "Choose an option"
}) => {
  const [checked, setChecked] = useState(selectedOption);
  const { colors, fonts } = useSelector(selectTheme);

  useEffect(() => {
    setChecked(selectedOption); // Update the checked state if the selectedOption changes
  }, [selectedOption]);

  const handleSelect = () => {
    close(false);
    onSelect(checked);
  };

  return (
    <Portal>
      <Dialog onDismiss={close} visible={visible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.ScrollArea style={styles.container}>
          <ScrollView>
            <View>
              {options.map((option) => (
                <TouchableRipple
                  key={option.value}
                  onPress={() => setChecked(option.value)}
                >
                  <View style={styles.row}>
                    <View pointerEvents="none">
                      <RadioButton
                        value={option.value}
                        status={checked === option.value ? 'checked' : 'unchecked'}
                      />
                    </View>
                    <TextComponent isSubheading style={styles.text}>
                      {option.label}
                    </TextComponent>
                  </View>
                </TouchableRipple>
              ))}
            </View>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={() => close(false)}>Cancel</Button>
          <Button onPress={handleSelect}>Ok</Button>
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
