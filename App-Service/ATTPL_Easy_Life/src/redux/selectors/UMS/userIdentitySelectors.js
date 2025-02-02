// Selector to get the user identity details from the state
export const selectUserIdentity = state => state.userIdentity.userIdentity;

// Selector to get the status of the user identity state
export const selectUserIdentityStatus = state => state.userIdentity.status;

// Selector to get any error related to user identity
export const selectUserIdentityError = state => state.userIdentity.error;
