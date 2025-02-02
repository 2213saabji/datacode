// selectors.js

// Import the necessary part of the state from the slice
import {createSelector} from '@reduxjs/toolkit';

// Basic selector to get the whole doctorDetails state
const selectDoctorDetailsState = state => state.doctorDetails;

// Selector to get all doctor details
export const selectAllDoctors = createSelector(
  [selectDoctorDetailsState],
  doctorDetails => doctorDetails.data,
);

// Selector to get the currently selected doctor
export const selectSelectedDoctor = createSelector(
  [selectDoctorDetailsState],
  doctorDetails => doctorDetails.selectedDoctor,
);

// Selector to get the loading status of doctor details operations
export const selectDoctorDetailsStatus = createSelector(
  [selectDoctorDetailsState],
  doctorDetails => doctorDetails.status,
);

// Selector to get the error from doctor details operations
export const selectDoctorDetailsError = createSelector(
  [selectDoctorDetailsState],
  doctorDetails => doctorDetails.error,
);
