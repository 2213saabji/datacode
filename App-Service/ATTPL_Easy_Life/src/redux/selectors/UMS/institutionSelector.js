// selectors.js

import {createSelector} from '@reduxjs/toolkit';

// Basic selector to get the whole institution state
const selectInstitutionState = state => state.institution;

// Selector to get all institutions
export const selectAllInstitutions = createSelector(
  [selectInstitutionState],
  institution => institution.list,
);

// Selector to get the currently selected institution
export const selectSelectedInstitution = createSelector(
  [selectInstitutionState],
  institution => institution.selectedInstitution,
);

// Selector to get the loading status of institution operations
export const selectInstitutionStatus = createSelector(
  [selectInstitutionState],
  institution => institution.status,
);

// Selector to get the error from institution operations
export const selectInstitutionError = createSelector(
  [selectInstitutionState],
  institution => institution.error,
);
