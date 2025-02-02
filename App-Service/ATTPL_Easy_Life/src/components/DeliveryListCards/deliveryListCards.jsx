import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useCustomAlert } from '../../utilities/Alert/useCustomAlert';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import SingleDropdownComponent from '../../components/ReusableComp/SingleDropDown';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/selectors';


const DeliveryListCard = ({bookingid,itemname,drivername,itemweight,vehicletype,bookingstatus}) => {
    const { colors } = useSelector(selectTheme);
    const dispatch = useDispatch();
    const { showAlert } = useCustomAlert();
    const user = useSelector(state => state?.auth?.user);


    return (
       
        <View style={[styles.parentBox, { borderColor: colors.text }]}>
            <View style={[styles.verticlebox,{}]}>
                <View style={[styles.textContainer,{}]}>
                    <Text style={[styles.nameTag,{color:colors.text}]}>Booking Id</Text>
                    <Text style={[{color:colors.text}]}>{bookingid}</Text>
                </View>
                <View style={[styles.textContainer,{}]}>
                    <Text style={[styles.nameTag,{color:colors.text}]}>Item Name</Text>
                    <Text style={[{color:colors.text}]}>{itemname}</Text>
                </View>
            </View>
            <View style={[styles.verticlebox,{}]}>
                <View style={[styles.textContainer,{}]}>
                    <Text style={[styles.nameTag,{color:colors.text}]}>Driver Name</Text>
                    <Text style={[{color:colors.text}]}>{drivername}</Text>
                </View>
                <View style={[styles.textContainer,{}]}>
                    <Text style={[styles.nameTag,{color:colors.text}]}>Item Weight</Text>
                    <Text style={[{color:colors.text}]}>{itemweight}</Text>
                </View>
            </View>
            <View style={[styles.verticlebox,{}]}>
                <View style={[styles.textContainer,{}]}>
                    <Text style={[styles.nameTag,{color:colors.text}]}>Vehicle Type</Text>
                    <Text style={[{color:colors.text}]}>{vehicletype}</Text>
                </View>
                <View style={[styles.textContainer,{}]}>
                    <Text style={[styles.nameTag,{color:colors.text}]}>Booking Status</Text>
                    <Text style={[{color:colors.text}]}>{bookingstatus}</Text>
                </View>
            </View>
        </View>
        // </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    parentBox: {
        paddingVertical: 10,
        paddingHorizontal:10,
        width: '100%',
        borderWidth: 0.5,
        borderStyle: "solid",
        borderRadius: 8,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:10,
    },
    nameTag:{
        opacity:0.8,
    },
    verticlebox:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        gap:20,
    },
    textContainer:{
        gap:5,
    }
});

export default DeliveryListCard;
