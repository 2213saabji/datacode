import React from 'react'
import { Text } from 'react-native-paper'
import CandidateAppointmentFrom from '../../components/CandidateBookAppointment/AB-new-edit-form'
import { ScrollView } from 'react-native-gesture-handler'
function AppointmentCreateViews() {
  return (
   <ScrollView>
    <CandidateAppointmentFrom />
   </ScrollView>
  )
}

export default AppointmentCreateViews