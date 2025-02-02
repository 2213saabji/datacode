// src/redux/selectors/UMS/userProfileSelectors.js

export const selectUserProfiles = state => state.userProfile.userProfiles;
export const selectCurrentUserProfile = state =>
  state.userProfile.currentUserProfile;
export const selectUserProfileLoading = state => state.userProfile.loading;
export const selectUserProfileError = state => state.userProfile.error;
export const selectUserProfileMessage = state => state.userProfile.message;
