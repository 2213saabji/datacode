import React from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import {Card, Paragraph, Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UpdateItem = ({title, description, date, links, colors, fonts}) => (
  <Card style={[styles.card, {backgroundColor: colors.surface}]}>
    <Card.Content>
      <Text
        style={[styles.title, {color: colors.primary, ...fonts.titleMedium}]}>
        {title}
      </Text>
      <Paragraph
        style={[styles.description, {color: colors.text, ...fonts.bodyMedium}]}>
        {description}
      </Paragraph>
      <Text
        style={[styles.date, {color: colors.placeholder, ...fonts.bodySmall}]}>
        {date}
      </Text>
      <View style={styles.buttonsContainer}>
        {links.map((link, index) => (
          <Button
            key={index}
            mode="contained"
            onPress={() => Linking.openURL(link.url)}
            style={[styles.button, {backgroundColor: colors.primary}]}
            labelStyle={{color: colors.surface}}
            icon={() => (
              <Ionicons name={link.icon} size={20} color={colors.surface} />
            )}>
            {link.label}
          </Button>
        ))}
      </View>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
  date: {
    fontSize: 14,
    marginTop: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    margin: 4,
  },
});

export default UpdateItem;
