// selectors.js

import {createSelector} from '@reduxjs/toolkit';

// Basic selector to get the whole businessmanDetails state
const selectBusinessmanDetailsState = state => state.businessmanDetails;

// Selector to get all businessman details
export const selectAllBusinessmen = createSelector(
  [selectBusinessmanDetailsState],
  businessmanDetails => businessmanDetails.data,
);

// Selector to get the currently selected businessman
export const selectSelectedBusinessman = createSelector(
  [selectBusinessmanDetailsState],
  businessmanDetails => businessmanDetails.selectedBusinessman,
);

// Selector to get the loading status of businessman details operations
export const selectBusinessmanDetailsStatus = createSelector(
  [selectBusinessmanDetailsState],
  businessmanDetails => businessmanDetails.status,
);

// Selector to get the error from businessman details operations
export const selectBusinessmanDetailsError = createSelector(
  [selectBusinessmanDetailsState],
  businessmanDetails => businessmanDetails.error,
);
