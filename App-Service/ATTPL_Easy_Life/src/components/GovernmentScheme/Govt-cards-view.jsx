import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme } from "../../redux/selectors";
import { ScrollView, StyleSheet } from "react-native";

import { fetchCards } from "../../redux/slices/CRM/FarmerCareerRoad/FarmerCareerRoadSlice";
import JobCard from "./jobcard";

export default function GovtSchemecardView({subRoute}) {

    const dispatch = useDispatch();
    const {colors, fonts} = useSelector(selectTheme);
    const [cards, setCards] = useState();

    const getCards = async () => {
        try {
            console.log(subRoute)
          const result = await dispatch(fetchCards(subRoute));
          console.log(result)
          if (fetchCards.fulfilled.match(result)) {
            if (result.payload) {
              setCards(result.payload);
              console.log("koo=>", result.payload);
              
            }
          }else{
            console.log("error in fetching");
            
          }
        } catch (err) {
          console.log(err);
        }
      };
    useEffect(() => {
        getCards();
        console.log("reloaded ======> cards");
    },[]);

    return (
        <ScrollView contentContainerStyle={[styles.scrollContainer,{backgroundColor: colors.background}]}>
        {
            cards?.map((card, index) => (
                <JobCard
                key={index}
                title={card.cardName}
                description={card.cardDescription}
                imageSource={card.cardImage?.imageUrl}
                fonts={fonts}
                />
            ))
        }
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    scrollContainer: {
      padding: 16,
    },
  });