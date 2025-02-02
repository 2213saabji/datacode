import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LazyScreen from './LazyScreen';

const Stack = createStackNavigator();

const WrappedStudentCareerRoadMap = props => (
  <LazyScreen name="StudentCareerList" {...props} />
);
const WrappedSchoolList = props => <LazyScreen name="SchoolList" {...props} />;
const WrappedSchoolDetailsView = props => (
  <LazyScreen name="SchoolDetail" {...props} />
);
const WrappedCollegeList = props => (
  <LazyScreen name="CollegeList" {...props} />
);
const WrappedCollegeDetailsView = props => (
  <LazyScreen name="CollegeDetail" {...props} />
);
const WrappedCoachingList = props => (
  <LazyScreen name="CoachingList" {...props} />
);
const WrappedCoachingDetailsView = props => (
  <LazyScreen name="CoachingDetail" {...props} />
);
const WrappedInstitutionAppointmentListView = props => (
  <LazyScreen name="InstitutionAppointmentList" {...props} />
);
const WrappedStudentAppointmentForm = props => (
  <LazyScreen name="StudentAppointmentCreate" {...props} />
);
const WrappedInstitutionAppointmentDetailsView = props => (
  <LazyScreen name="InstitutionAppointmentDetail" {...props} />
);

const WrappedStudentGuideView = props => (
  <LazyScreen name="studentGuideScreen" {...props} />
);

const StudentCareerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="StudentCareerList">
      <Stack.Screen
        name="StudentCareerList"
        component={WrappedStudentCareerRoadMap}
      />
      <Stack.Screen name="SchoolList" component={WrappedSchoolList} />
      <Stack.Screen name="SchoolDetail" component={WrappedSchoolDetailsView} />
      <Stack.Screen name="CollegeList" component={WrappedCollegeList} />
      <Stack.Screen
        name="CollegeDetail"
        component={WrappedCollegeDetailsView}
      />
      <Stack.Screen name="CoachingList" component={WrappedCoachingList} />
      <Stack.Screen
        name="CoachingDetail"
        component={WrappedCoachingDetailsView}
      />
      <Stack.Screen
        name="InstitutionAppointmentList"
        component={WrappedInstitutionAppointmentListView}
      />
      <Stack.Screen
        name="StudentAppointmentCreate"
        component={WrappedStudentAppointmentForm}
      />
      <Stack.Screen
        name="InstitutionAppointmentDetail"
        component={WrappedInstitutionAppointmentDetailsView}
      />
      <Stack.Screen
        name="studentGuideScreen"
        component={WrappedStudentGuideView}
      />
    </Stack.Navigator>
  );
};

export default StudentCareerNavigator;
