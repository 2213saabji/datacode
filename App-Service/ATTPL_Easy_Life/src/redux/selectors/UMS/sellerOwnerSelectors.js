// redux/selectors/sellerOwnerSelectors.js

// Selector to get all seller owners
export const selectAllSellerOwners = state => state.sellerOwners.list;

// Selector to get a specific seller owner by ID
export const selectSellerOwnerById = (state, userId) =>
  state.sellerOwners.list.find(owner => owner.userId === userId);

// Selector to get the current seller owner details
export const selectCurrentSellerOwner = state =>
  state.sellerOwners.currentSellerOwner;

// Selector to get the status of seller owner-related actions
export const selectSellerOwnerStatus = state => state.sellerOwners.status;

// Selector to get the error for seller owner-related actions
export const selectSellerOwnerError = state => state.sellerOwners.error;
