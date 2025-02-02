import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const projects = [
  {
    category: 'Road Construction',
    title: 'Road Construction',
    description: 'Road Construction In Nagpur',
  },
  {
    category: 'Metro Construction',
    title: 'Metro Construction',
    description: 'Metro Construction In Pune',
  },
  {
    category: 'Celebrations At Attpl',
    title: 'Celebrations at Attpl',
    description: 'Celebrations',
  },
  {
    category: 'RAM Mandir Construction',
    title: 'RAM Mandir Construction',
    description: 'RAM Mandir Construction',
  },
];
/**
 * NationalProjectsUpdates Component
 *
 * This component displays updates on national projects, including categories, titles, and descriptions. It features
 * a back button to navigate to the previous screen and a list of project updates, each presented in a styled card format.
 *
 * - **Back Button**: Navigates the user back to the dashboard.
 * - **Title**: Displays "NATIONAL PROJECTS UPDATES" at the top of the screen.
 * - **Project Cards**: Shows a list of projects with category, title, and description for each project.
 *
 * @component
 * @example
 * <NationalProjectsUpdates navigation={navigation} />
 *
 * @param {object} props - The component's props.
 * @param {object} props.navigation - The navigation object used to handle screen transitions.
 *
 * @returns {JSX.Element} The rendered NationalProjectsUpdates component with dynamic styling based on the current theme.
 *
 * @author SHIVAM GAUTAM
 * @co-author PRATHAMESH GHORPADE
 */

const NationalProjectsUpdates = ({navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <TouchableOpacity
        style={[styles.backButton, {borderColor: colors.primary}]}
        onPress={() => navigation.goBack()}>
        <Text
          style={[
            styles.backButtonText,
            {color: colors.primary, fontFamily: fonts.bodyMedium.fontFamily},
          ]}>
          Back To Dashboard
        </Text>
      </TouchableOpacity>
      <Text
        style={[
          styles.title,
          {color: colors.text, fontFamily: fonts.titleLarge.fontFamily},
        ]}>
        NATIONAL PROJECTS UPDATES
      </Text>
      <ScrollView>
        {projects.map((project, index) => (
          <View
            key={index}
            style={[
              styles.card,
              {backgroundColor: colors.surface, shadowColor: colors.onSurface},
            ]}>
            <Text
              style={[
                styles.cardCategory,
                {
                  color: colors.background,
                  fontFamily: fonts.bodyMedium.fontFamily,
                  backgroundColor: colors.primary,
                },
              ]}>
              {project.category}
            </Text>
            <Text
              style={[
                styles.cardTitle,
                {color: colors.text, fontFamily: fonts.titleMedium.fontFamily},
              ]}>
              {project.title}
            </Text>
            <Text
              style={[
                styles.cardDescription,
                {
                  color: colors.onBackground,
                  fontFamily: fonts.bodyMedium.fontFamily,
                },
              ]}>
              {project.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    width: 150,
    height: 35,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    lineHeight: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    opacity: 0.9,
  },
  cardCategory: {
    fontSize: 14,
    marginBottom: 5,
    padding: 10,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontWeight: '500',
    lineHeight: 20,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    lineHeight: 20,
    marginTop: 20,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    marginTop: 10,
  },
});

export default NationalProjectsUpdates;
