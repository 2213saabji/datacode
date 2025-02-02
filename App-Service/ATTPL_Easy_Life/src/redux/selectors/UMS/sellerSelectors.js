// redux/selectors/sellerSelectors.js

// Selector to get all sellers
export const selectAllSellers = state => state.sellers.list;

// Selector to get a specific seller by ID
export const selectSellerById = (state, sellerId) =>
  state.sellers.list.find(seller => seller.sellerOwnerId === sellerId);

// Selector to get the current seller details
export const selectCurrentSeller = state => state.sellers.currentSeller;

// Selector to get the status of seller-related actions
export const selectSellerStatus = state => state.sellers.status;

// Selector to get the error for seller-related actions
export const selectSellerError = state => state.sellers.error;
