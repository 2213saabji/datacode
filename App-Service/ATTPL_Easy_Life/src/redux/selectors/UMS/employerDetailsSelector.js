// selectors.js

import {createSelector} from '@reduxjs/toolkit';

// Basic selector to get the whole employerDetails state
const selectEmployerDetailsState = state => state.employerDetails;

// Selector to get all employer details
export const selectAllEmployers = createSelector(
  [selectEmployerDetailsState],
  employerDetails => employerDetails.data,
);

// Selector to get the currently selected employer
export const selectSelectedEmployer = createSelector(
  [selectEmployerDetailsState],
  employerDetails => employerDetails.selectedEmployer,
);

// Selector to get the loading status of employer details operations
export const selectEmployerDetailsStatus = createSelector(
  [selectEmployerDetailsState],
  employerDetails => employerDetails.status,
);

// Selector to get the error from employer details operations
export const selectEmployerDetailsError = createSelector(
  [selectEmployerDetailsState],
  employerDetails => employerDetails.error,
);
