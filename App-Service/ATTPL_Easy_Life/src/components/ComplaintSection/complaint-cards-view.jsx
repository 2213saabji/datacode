import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../redux/selectors';
import { ScrollView, StyleSheet } from 'react-native';

import { fetchComplaints } from '../../redux/slices/CRM/ComplaintSection';
import JobCard from './JobCard';

export default function ComplaintCardsView({ navigation }) {
  const dispatch = useDispatch();
  const { colors, fonts } = useSelector(selectTheme);
  const [cards, setCards] = useState();

  const getCards = async () => {
    try {
      const result = await dispatch(fetchComplaints());
      if (fetchComplaints.fulfilled.match(result)) {
        if (result.payload) {
          setCards(result.payload);
          console.log('=================>', result.payload);
        }
      } else {
        console.log('error in fetching');
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCards();
    console.log('reloaded ======> cards');
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        { backgroundColor: colors.background },
      ]}>
      {cards?.map((card, index) => (
        <JobCard
          key={index}
          title={card.cardName}
          description={card.cardDescription}
          imageSource={card.cardImage?.url}
          complainSectionSubRouteId={card.complainSectionSubRouteId}
          fonts={fonts}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
});
