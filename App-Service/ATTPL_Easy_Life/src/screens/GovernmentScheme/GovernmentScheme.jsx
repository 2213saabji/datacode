import React, {useState, useEffect} from 'react';
import { StyleSheet, View,  Image} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import SubRouteCardsView from '../../components/SubRouteCards/subRoute-cards-view';

const GovernmentScheme = ({navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const [modalVisible, setModalVisible] = useState(false);
  const [currTab, setCurrTab] = useState({
    key: 'attplServices',
    title: 'ATTPL SERVICES',
  });
  
  const getCards = async cards => {
    try {
      if (govermentSchemeList.length <= 0) {
        const response = await dispatch(fetchGovermentSchemaCards({cards}));
        if (fetchGovermentSchemaCards.fulfilled.match(response)) {
          setGovermentSchemeList(prev => [...prev, ...response.payload.data]);
        } else {
          Alert.alert('Error', response.payload || 'Error While fetch List');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An Unexpected error occurred');
    }
  };
  useEffect(() => {
    getCards('Government Scheme');
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/governmentScheme/Government_scheme.webp')}
        style={styles.horizontalImage}
      />
      <SubRouteCardsView popUp={true} subRoute="Government Scheme" screenName='GovernmentSchemeInner' navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  horizontalImage: {
    width: '100%',
    height: 140,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default GovernmentScheme;
