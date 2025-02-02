import React, { useState,useEffect } from 'react'
import { Text } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux';
import CandidateAppointmentFrom from '../../components/CandidateBookAppointment/AB-new-edit-form'
import { ScrollView } from 'react-native-gesture-handler'
import { getCandidateAppointment} from '../../redux/slices/CMS/candidateAppointment';
function AppointmentEdit({route}) {


  const dispatch = useDispatch();
   const AppointmentId=route?.params?.AppointmentId
  const [appointment, setAppointment] = useState({});
  // const AppointmentId = route?.params?.AppointmentId;
  const getData = async () => {
    try {
    
      const result = await dispatch(getCandidateAppointment(AppointmentId));
       console.log(result)
      if (getCandidateAppointment.fulfilled.match(result)) {
        if (result.payload) {
         console.log("result--->",result.payload)
            setAppointment(result.payload);
        } else {
            
            setAppointment({});
        }
      } else {
      
        console.log(result.payload || 'Failed to fetch Apointment.');
      }
    } catch (error) {
      console.log(error.message || 'An unexpected error occurred');
    }
  };
useEffect(()=>{
  getData()
},[dispatch])
  return (
    <ScrollView>
      <CandidateAppointmentFrom  currentappointment={appointment}/></ScrollView>
  )
}

export default AppointmentEdit