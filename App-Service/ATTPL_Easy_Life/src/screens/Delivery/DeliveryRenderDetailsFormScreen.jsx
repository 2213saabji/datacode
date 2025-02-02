import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';
import debounce from 'lodash/debounce';
import Header from '../../components/Settings/Header';
import InputField from '../../components/EditProfile/InputField';
import { TextInput } from 'react-native-paper';



const DeliveryRenderDetailsFormScreen = ({navigation}) => {
  const {showAlert} = useCustomAlert();

  const {colors, fonts} = useSelector(selectTheme);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // const SubmitForm = async () => {
  //   try {
  //     const res = await dispatch();
  //     if (RequestDoctorForm.fulfilled.match(res)) {
  //     } else if (RequestDoctorForm.rejected.match(res)) {
  //       showAlert("Error Occur's while Getting your Data", 'error');
  //     }
  //   } catch (error) {
  //     showAlert(error || 'An unexpected error occurred', 'error');
  //   }
  // };

  return (
    <>
    <Header navigation={navigation} colors={colors} fonts={fonts}setting={null}text={"DELIVERY LIST"} />
      <ScrollView
        style={[styles.container, {backgroundColor: colors.background}]}
        >
          <Image
        source={require('../../assets/governmentScheme/Government_scheme.webp')}
        style={styles.horizontalImage}
      />
        
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            border: '2px solid white',
            marginBottom: 10,
          }}>
          <Text
            style={[
              styles.sectionTitle,
              {color: colors.text, ...fonts.titleMedium},
            ]}>
            {`TRIP  .  `}
          </Text>
          <Text
            style={[
              styles.sectionTitle,
              {color: colors.text, ...fonts.titleMedium, opacity: 0.7},
            ]}>
            Details
          </Text>
        </View>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
              ...fonts.titleMedium,
              marginTop:10,
              marginBottom: 15,
              fontSize: 25,
              fontWeight:700,
            },
          ]}>
          ITEM DETAILS
        </Text>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Item Name
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",}]}>
            helo
          </Text>
        </View>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Item Height
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",}]}>
            helo
          </Text>
        </View>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Item Width
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",}]}>
            helo
          </Text>
        </View>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Item Size
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",}]}>
            helo
          </Text>
        </View>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Item Weight
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",}]}>
            helo
          </Text>
        </View>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
              ...fonts.titleMedium,
              marginTop:10,
              marginBottom: 15,
              fontSize: 25,
              fontWeight:700,
            },
          ]}>
          DRIVER DETAILS
        </Text>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Driver Name
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",}]}>
            helo
          </Text>
        </View>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Driver Phone
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",}]}>
            helo
          </Text>
        </View>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Driver Email
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",}]}>
            helo
          </Text>
        </View>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Booking Status
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",}]}>
            helo
          </Text>
        </View>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
              ...fonts.titleMedium,
              marginTop:10,
              marginBottom: 15,
              fontSize: 25,
              fontWeight:700,
            },
          ]}>
          VEHICLE DETAILS
        </Text>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Vehicle Model
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",}]}>
            helo
          </Text>
        </View>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Vehicle Name
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",}]}>
            helo
          </Text>
        </View>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Vehicle Type
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",}]}>
            helo
          </Text>
        </View>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Registration Number
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",}]}>
            helo
          </Text>
        </View>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Fuel Type
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",}]}>
            helo
          </Text>
        </View>
        <View style={{marginBottom:20}}>
          <Text
           style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, opacity: 0.7,marginBottom:10,fontWeight:900},
          ]}
          >Weight Capacity
          </Text>
          <Text style={[styles.textdetails,{...fonts.bodyMedium,color:colors.text,borderColor:colors.primary?"#0002":"#fff",marginBottom:30}]}>
            helo
          </Text>
        </View>

     
      </ScrollView>
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    // paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
    marginLeft: 16,
  },
  horizontalImage: {
    width: '100%',
    height: 140,
    marginBottom: 16,
    borderRadius: 8,
  },
  textdetails:{
    borderWidth:1,
    borderRadius:5,
    width:"100%",
    heigth:40,
    paddingVertical:10,
    paddingHorizontal:10
  }
});

export default DeliveryRenderDetailsFormScreen;
