import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../redux/selectors';

import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
    Text,
    Linking,
    Dimensions,
} from 'react-native';

import { fetchSubComplaints, fetchSubStateComplaints } from '../../redux/slices/CRM/ComplaintSection';
import JobInnerCard from './JobInnerCard';

export default function ComplaintInnerCardsView({
    type,
    popUp,
    subRoute,
    navigation,
}) {
    const dispatch = useDispatch();
    const { colors, fonts } = useSelector(selectTheme);
    const { height: screenHeight } = Dimensions.get('window');
    const [cards, setCards] = useState(null); // Initialize as null for better type safety
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState({
        complainMailId: '',
        cardUrl: '',
        complainMailDetails: {},
    });

    const getCentralCards = async () => {
        try {
            const result = await dispatch(fetchSubComplaints(subRoute));

            if (fetchSubComplaints.fulfilled.match(result)) {
                if (result.payload) {
                    setCards(result.payload?.subRoute1?.centerComplainsList1);
                }
            } else {
                console.log('Error in fetching');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getStateCards = async () => {
        try {
            const result = await dispatch(fetchSubStateComplaints(subRoute));

            if (fetchSubStateComplaints.fulfilled.match(result)) {
                if (result.payload) {
                    setCards(result.payload?.subRoute1?.centerComplainsList1);
                }
            } else {
                console.log('Error in fetching');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleApply = () => {
        navigation.navigate('mailForm', {
            complainMailId: selectedCard.complainMailId,
            complainMailDetails: selectedCard.complainMailDetails,
        });
        setModalVisible(!modalVisible);
    };

    const handleUrl = () => {
        Linking.openURL(selectedCard.cardUrl)
            .then(setModalVisible(!modalVisible))
            .catch(err =>
                console.error('An error occurred while trying to open the URL:', err),
            );
    };

    useEffect(() => {
        const fetchData = async () => {
            if (type === 'central') {
                await getCentralCards();
            } else if (type === 'state') {
                await getStateCards();
            }
        };

        // Clear cards state before fetching new data
        setCards(null);

        fetchData();
    }, [type]);


    return (
        <ScrollView
            contentContainerStyle={[
                styles.scrollContainer,
                { backgroundColor: colors.background, minHeight: screenHeight },
            ]}>
            {cards && cards.length > 0 ? ( // Check if cards exist
                <>
                    {cards.map((card, index) => (
                        <JobInnerCard
                            key={index}
                            title={card.cardName}
                            complainSectionSubRouteId={card.complainSectionSubRouteId}
                            description={card.cardDescription}
                            imageSource={card.cardImage?.url}
                            fonts={fonts}
                            cardUrl={card.cardUrl}
                            popUp={popUp}
                            complainMailId={card.complainMailId}
                            complainMailDetails={card.complainMailDetails}
                            setModalVisible={setModalVisible}
                            setSelectedCard={setSelectedCard}
                        />
                    ))}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(!modalVisible)}>
                        <Pressable
                            style={styles.overlay}
                            onPress={() => setModalVisible(false)} // Close modal when the overlay is pressed
                        >
                            <View style={styles.centeredView}>
                                {/* Prevent closing the modal when tapping inside the modal content */}
                                <Pressable
                                    style={[styles.modalView, { backgroundColor: colors.surface }]}
                                    onPress={() => { }}>
                                    <Text
                                        style={[
                                            styles.modalText,
                                            { color: colors.text, ...fonts.bodyLarge },
                                        ]}>
                                        Select To Register Your Complaint!
                                    </Text>
                                    <View style={styles.flexView}>
                                        <Pressable
                                            style={[styles.button, { backgroundColor: '#efd67a' }]}
                                            onPress={handleApply}>
                                            <Text style={[styles.textStyle, { color: '#FF8C42' }]}>
                                                Complaint Via Mail
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            style={[styles.button, { backgroundColor: '#cba7f9' }]}
                                            onPress={handleUrl}>
                                            <Text style={[styles.textStyle, { color: '#8a31f7' }]}>
                                                Complaint Via Portal
                                            </Text>
                                        </Pressable>
                                    </View>
                                </Pressable>
                            </View>
                        </Pressable>
                    </Modal>
                </>
            ) : (
                <Text>No cards available</Text> // Fallback in case there are no cards
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
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 35,
        paddingHorizontal: 28,
        alignItems: 'center',
        shadowColor: '#000',
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
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
