// selectors.js

import {createSelector} from '@reduxjs/toolkit';

// Basic selector to get the whole institution owner state
const selectInstitutionOwnerState = state => state.institutionOwner;

// Selector to get all institution owners
export const selectAllInstitutionOwners = createSelector(
  [selectInstitutionOwnerState],
  institutionOwner => institutionOwner.list,
);

// Selector to get the currently selected institution owner
export const selectSelectedInstitutionOwner = createSelector(
  [selectInstitutionOwnerState],
  institutionOwner => institutionOwner.selectedOwner,
);

// Selector to get the loading status of institution owner operations
export const selectInstitutionOwnerStatus = createSelector(
  [selectInstitutionOwnerState],
  institutionOwner => institutionOwner.status,
);

// Selector to get the error from institution owner operations
export const selectInstitutionOwnerError = createSelector(
  [selectInstitutionOwnerState],
  institutionOwner => institutionOwner.error,
);
