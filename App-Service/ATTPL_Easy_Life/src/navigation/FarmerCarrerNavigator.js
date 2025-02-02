import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LazyScreen from './LazyScreen';
const Stack = createStackNavigator();

const WrappedFarmersCareerRoadMap = props => (
  <LazyScreen name="FarmersCareerRoadMap" {...props} />
);
const WrappedFarmerMyAppointmentList = props => (
  <LazyScreen name="FarmerCarrerList" {...props} />
);
const WrappedFarmerAppointmentForm = props => (
  <LazyScreen name="FarmerAppointmentCreate" {...props} />
);
const WrappedFarmerAppointmentListView = props => (
  <LazyScreen name="FarmerAppointmentList" {...props} />
);
const WrappedFarmerAppointmentDetailsView = props => (
  <LazyScreen name="FarmerAppointmentDetail" {...props} />
);
const WrappedModernAgriToolList = props => (
  <LazyScreen name="ModernTool" {...props} />
);
const WrappedCultivationToolList = props => (
  <LazyScreen name="CultivationTool" {...props} />
);
const WrappedIrrigationToolList = props => (
  <LazyScreen name="IrrigationTool" {...props} />
);
const WrappedCombineHarvesterList = props => (
  <LazyScreen name="HarvesterTool" {...props} />
);
const WrappedTractorList = props => (
  <LazyScreen name="TractorTool" {...props} />
);
const WrappedModernToolDetailsView = props => (
  <LazyScreen name="ModernToolDetail" {...props} />
);
const WrappedCultivationToolDetailsView = props => (
  <LazyScreen name="CultivationToolDetail" {...props} />
);
const WrappedIrrigationToolDetailsView = props => (
  <LazyScreen name="IrrigationToolDetail" {...props} />
);
const WrappedCombineHarvesterToolDetailsView = props => (
  <LazyScreen name="CombineHarvesterToolDetail" {...props} />
);
const WrappedTractorToolDetailsView = props => (
  <LazyScreen name="TractorToolDetail" {...props} />
);
const WrappedModernToolForm = props => (
  <LazyScreen name="ModernToolCreate" {...props} />
);
const WrappedCultivationToolForm = props => (
  <LazyScreen name="CultivationToolCreate" {...props} />
);
const WrappedIrrigationToolForm = props => (
  <LazyScreen name="IrrigationToolCreate" {...props} />
);
const WrappedCombineHarvesterToolForm = props => (
  <LazyScreen name="CombineHarvesterToolCreate" {...props} />
);
const WrappedTractorToolForm = props => (
  <LazyScreen name="TractorToolCreate" {...props} />
);
const WrappedCattleDetailsView = props => (
  <LazyScreen name="CattleDetail" {...props} />
);
const WrappedFarmerCardInner = props => (
  <LazyScreen name="FarmerCardInnerScreen" {...props} />
);
const WrappedFarmerGuideView = props => (
  <LazyScreen name="FarmerGuideViewScreen" {...props} />
);
const WrappedBuySellCropsScreen = props => (
  <LazyScreen name="FarmerBuySellCropsScreen" {...props} />
);

const FarmerCarrerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="FarmersCareerRoadMap">
      <Stack.Screen
        name="FarmerCardInnerScreen"
        component={WrappedFarmerCardInner}
      />
      <Stack.Screen
        name="FarmerCarrerList"
        component={WrappedFarmerMyAppointmentList}
      />
      <Stack.Screen
        name="FarmersCareerRoadMap"
        component={WrappedFarmersCareerRoadMap}
      />
      <Stack.Screen
        name="FarmerGuideViewScreen"
        component={WrappedFarmerGuideView}
      />
      <Stack.Screen name="ModernTool" component={WrappedModernAgriToolList} />
      <Stack.Screen
        name="CultivationTool"
        component={WrappedCultivationToolList}
      />
      <Stack.Screen
        name="IrrigationTool"
        component={WrappedIrrigationToolList}
      />
      <Stack.Screen
        name="HarvesterTool"
        component={WrappedCombineHarvesterList}
      />
      <Stack.Screen name="TractorTool" component={WrappedTractorList} />
      <Stack.Screen name="ModernToolCreate" component={WrappedModernToolForm} />
      <Stack.Screen
        name="ModernToolDetail"
        component={WrappedModernToolDetailsView}
      />
      <Stack.Screen
        name="CultivationToolCreate"
        component={WrappedCultivationToolForm}
      />
      <Stack.Screen
        name="CultivationToolDetail"
        component={WrappedCultivationToolDetailsView}
      />
      <Stack.Screen
        name="IrrigationToolCreate"
        component={WrappedIrrigationToolForm}
      />
      <Stack.Screen
        name="IrrigationToolDetail"
        component={WrappedIrrigationToolDetailsView}
      />
      <Stack.Screen
        name="CombineHarvesterToolCreate"
        component={WrappedCombineHarvesterToolForm}
      />
      <Stack.Screen
        name="CombineHarvesterToolDetail"
        component={WrappedCombineHarvesterToolDetailsView}
      />
      <Stack.Screen
        name="TractorToolCreate"
        component={WrappedTractorToolForm}
      />
      <Stack.Screen
        name="TractorToolDetail"
        component={WrappedTractorToolDetailsView}
      />
      <Stack.Screen
        name="FarmerAppointmentCreate"
        component={WrappedFarmerAppointmentForm}
      />
      <Stack.Screen
        name="FarmerAppointmentList"
        component={WrappedFarmerAppointmentListView}
      />
      <Stack.Screen
        name="FarmerAppointmentDetail"
        component={WrappedFarmerAppointmentDetailsView}
      />
      <Stack.Screen name="CattleDetail" component={WrappedCattleDetailsView} />
      <Stack.Screen
        name="FarmerBuySellCropsScreen"
        component={WrappedBuySellCropsScreen}
      />
    </Stack.Navigator>
  );
};

export default FarmerCarrerNavigator;
