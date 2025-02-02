// selectors.js

import {createSelector} from '@reduxjs/toolkit';

// Basic selector to get the whole businessmanDetails state
const selectGovermentSchemaDetailsState = state => state.govermentSchemaDetails;

// Selector to get all businessman details
export const selectGovermentdata = createSelector(
  [selectGovermentSchemaDetailsState],
  govermentSchema => govermentSchema.data,
);

// Selector to get the currently selected businessman
export const selectSelectedBusinessman = createSelector(
  [selectGovermentSchemaDetailsState],
  businessmanDetails => businessmanDetails.selectedBusinessman,
);

// Selector to get the loading status of businessman details operations
export const selectBusinessmanDetailsStatus = createSelector(
  [selectGovermentSchemaDetailsState],
  businessmanDetails => businessmanDetails.status,
);

// Selector to get the error from businessman details operations
export const selectBusinessmanDetailsError = createSelector(
  [selectGovermentSchemaDetailsState],
  businessmanDetails => businessmanDetails.error,
);
