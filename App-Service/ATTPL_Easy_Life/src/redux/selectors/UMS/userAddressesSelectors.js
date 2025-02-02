// Selector to get the user addresses from the state
export const selectUserAddresses = state => state.userAddresses.addresses;

// Selector to get the status of the user addresses state
export const selectUserAddressesStatus = state => state.userAddresses.status;

// Selector to get any error related to user addresses
export const selectUserAddressesError = state => state.userAddresses.error;
