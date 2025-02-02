// redux/selectors/serviceHistorySelectors.js

// Selector to get service history by user ID
export const selectServiceHistory = state =>
  state.serviceHistory.serviceHistory;

// Selector to get the status of service history-related actions
export const selectServiceHistoryStatus = state => state.serviceHistory.status;

// Selector to get the error for service history-related actions
export const selectServiceHistoryError = state => state.serviceHistory.error;
