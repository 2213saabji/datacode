import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme } from "../../redux/selectors";
import { useNavigation } from "../../navigation/NavigationContext";
import { Modal, Pressable, ScrollView, StyleSheet, View, Text, Linking, Dimensions } from "react-native";

import { fetchCards } from "../../redux/slices/CRM/FarmerCareerRoad/FarmerCareerRoadSlice";
import JobCard from "./JobCard";
import EmptyContent from "../ReusableComp/empty-content";
import { Card } from "react-native-paper";
import ShimmerPlaceHolder from "../../hooks/useShimmer";

export default function SubRouteCardsView({ popUp, subRoute, screenName, navigation }) {
  const dispatch = useDispatch();
  const { colors, fonts } = useSelector(selectTheme);
  const { height: screenHeight } = Dimensions.get('window');
  const [cards, setCards] = useState(null); // Initialize as null for better type safety
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    title: '',
    cardUrl: '',
    applyUrl: null,
  });

  const getCards = async () => {
    try {
      const result = await dispatch(fetchCards(subRoute));
      if (fetchCards.fulfilled.match(result)) {
        if (result.payload) {
          setLoading(false);
          setCards(result.payload);
        }
      } else {
        setLoading(false);
        console.log("Error in fetching");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleApply = () => {
    console.log("inner Called", screenName);
    if (selectedCard.applyUrl !== null) {
      Linking.openURL(selectedCard.applyUrl).then(setModalVisible(!modalVisible)).catch(err =>
        console.error('An error occurred while trying to open the URL:', err),
      );
    } else {
      navigation.navigate(screenName, { innerRoute: selectedCard.title });
      setModalVisible(!modalVisible);
    }
  }

  const handleUrl = () => {
    Linking.openURL(selectedCard.cardUrl).then(setModalVisible(!modalVisible)).catch(err =>
      console.error('An error occurred while trying to open the URL:', err),
    );
  }

  useEffect(() => {
    setLoading(true);
    getCards();
  }, []);

  const loadingScreen = (
    <>
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <ShimmerPlaceHolder
          style={[styles.imageSkeleton, { backgroundColor: colors.placeholder }]}
        />
        <Card.Content>
          <ShimmerPlaceHolder
            style={[
              styles.subtitleSkeleton,
              { backgroundColor: colors.placeholder },
            ]}
          />

          <ShimmerPlaceHolder
            style={[styles.paraSkeleton, { backgroundColor: colors.placeholder }]}
          />
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <ShimmerPlaceHolder
          style={[styles.imageSkeleton, { backgroundColor: colors.placeholder }]}
        />
        <Card.Content>
          <ShimmerPlaceHolder
            style={[
              styles.subtitleSkeleton,
              { backgroundColor: colors.placeholder },
            ]}
          />

          <ShimmerPlaceHolder
            style={[styles.paraSkeleton, { backgroundColor: colors.placeholder }]}
          />
        </Card.Content>
      </Card>
    </>

  )

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: colors.background, minHeight: screenHeight }]}>
      {cards && cards.length > 0 ? ( // Check if cards exist
        <>
          {cards.map((card, index) => (
            <JobCard
              key={index}
              title={card.cardName}
              description={card.cardDescription}
              imageSource={card.cardImage?.imageUrl}
              fonts={fonts}
              cardUrl={card.cardUrl}
              routeTypeName={card.routeTypeName}
              popUp={popUp}
              applyUrl={card?.applyUrl || null}
              setModalVisible={setModalVisible}
              setSelectedCard={setSelectedCard}
              navigation={navigation}
            />
          ))}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <Pressable
              style={styles.overlay}
              onPress={() => setModalVisible(false)} // Close modal when the overlay is pressed
            >
              <View style={styles.centeredView}>
                {/* Prevent closing the modal when tapping inside the modal content */}
                <Pressable style={[styles.modalView, { backgroundColor: colors.surface }]} onPress={() => { }}>
                  <Text style={[styles.modalText, { color: colors.text, ...fonts.bodyLarge }]}>{selectedCard.title}</Text>
                  <View style={styles.flexView}>
                    <Pressable
                      style={[styles.button, { backgroundColor: '#efd67a' }]}
                      onPress={handleApply}
                    >
                      <Text style={[styles.textStyle, { color: '#FF8C42' }]}>Want to Apply</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.button, { backgroundColor: '#cba7f9' }]}
                      onPress={handleUrl}
                    >
                      <Text style={[styles.textStyle, { color: '#8a31f7' }]}>Want to Explore</Text>
                    </Pressable>
                  </View>
                </Pressable>
              </View>
            </Pressable>
          </Modal>


        </>
      ) : (
        loading ? (
          loadingScreen
        ) : (
          <EmptyContent filled title="No Data" style={{ padding: '0 10' }} />
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  flexView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    margin: 10,
    borderRadius: 8,
    padding: 16,
    elevation: 4, // Add elevation for shadow (Android)
  },
  imageSkeleton: {
    height: 320, // Adjust the height as per your design
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  subtitleSkeleton: {
    width: '90%',
    height: 20,
    marginTop: 20,
    borderRadius: 4,
  },
  paraSkeleton: {
    width: '90%',
    height: 60,
    marginTop: 20,
    borderRadius: 4,
  },
});
