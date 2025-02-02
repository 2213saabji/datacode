import {createSelector} from '@reduxjs/toolkit';

export const selectUsers = state => state.user.users;

export const selectUserProfile = state => state.user.userProfile;

export const selectLoading = state => state.user.loading;

export const selectError = state => state.user.error;

// Example of a memoized selector
export const selectUsersByRole = createSelector(
  [selectUsers, (state, role) => role],
  (users, role) => users.filter(user => user.userRoleType === role),
);
