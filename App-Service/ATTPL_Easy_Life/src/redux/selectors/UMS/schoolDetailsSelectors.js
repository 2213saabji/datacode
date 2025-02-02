// selectors.js

import {createSelector} from '@reduxjs/toolkit';

// Basic selector to get the whole schoolDetails state
const selectSchoolDetailsState = state => state.schoolDetails;

// Selector to get all school details
export const selectAllSchoolDetails = createSelector(
  [selectSchoolDetailsState],
  schoolDetails => schoolDetails.data,
);

// Selector to get the currently selected school detail
export const selectSelectedSchoolDetail = createSelector(
  [selectSchoolDetailsState],
  schoolDetails => schoolDetails.selectedSchoolDetail,
);

// Selector to get the loading status of school details operations
export const selectSchoolDetailsStatus = createSelector(
  [selectSchoolDetailsState],
  schoolDetails => schoolDetails.status,
);

// Selector to get the error from school details operations
export const selectSchoolDetailsError = createSelector(
  [selectSchoolDetailsState],
  schoolDetails => schoolDetails.error,
);
