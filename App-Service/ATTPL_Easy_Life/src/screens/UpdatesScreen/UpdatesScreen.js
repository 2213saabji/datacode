import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import UpdateItem from '../../components/UpdatesScreen/UpdateItem';
/**
 * UpdatesScreen Component
 *
 * This component displays a list of updates in a scrollable view. Each update item includes a
 * title, description, date, and related links to the Play Store and App Store. The component
 * utilizes the `Header` component for navigation and title display, and the `UpdateItem` component
 * for rendering individual update details. The appearance of the component is styled based on
 * the current theme from Redux, including colors and fonts.
 *
 * - **Header Component:** Provides navigation and a title for the Updates screen.
 * - **UpdateItem Component:** Displays each update's title, description, date, and links.
 *
 * @component
 * @example
 * <UpdatesScreen />
 *
 * @returns {JSX.Element} The rendered component with a list of updates.
 *
 * @author PRATHAMESH GHORPADE
 */

const UpdatesScreen = () => {
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  const updates = [
    {
      id: 1,
      title: 'Update 1',
      description: 'Description for update 1',
      date: '2024-07-01',
      links: [
        {
          label: 'Play Store',
          url: 'https://play.google.com/store',
          icon: 'logo-google-playstore',
        },
        {
          label: 'App Store',
          url: 'https://www.apple.com/app-store/',
          icon: 'logo-apple',
        },
      ],
    },
    {
      id: 2,
      title: 'Update 2',
      description: 'Description for update 2',
      date: '2024-07-05',
      links: [
        {
          label: 'Play Store',
          url: 'https://play.google.com/store',
          icon: 'logo-google-playstore',
        },
        {
          label: 'App Store',
          url: 'https://www.apple.com/app-store/',
          icon: 'logo-apple',
        },
      ],
    },
    // Add more updates as needed
  ];

  return (
    <>
      <Header
        navigation={navigation}
        title="Updates"
        colors={colors}
        fonts={fonts}
      />
      <ScrollView
        style={[styles.container, {backgroundColor: colors.background}]}>
        {updates.map(update => (
          <UpdateItem
            key={update.id}
            title={update.title}
            description={update.description}
            date={update.date}
            links={update.links}
            colors={colors}
            fonts={fonts}
          />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default UpdatesScreen;
