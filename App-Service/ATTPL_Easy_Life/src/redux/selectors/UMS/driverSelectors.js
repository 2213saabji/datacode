// redux/selectors/driverSelectors.js

// Selector to get all drivers
export const selectAllDrivers = state => state.drivers.drivers;

// Selector to get a specific driver by ID
export const selectDriverById = (state, driverId) =>
  state.drivers.drivers.find(driver => driver.id === driverId);

// Selector to get the current driver details
export const selectCurrentDriver = state => state.drivers.currentDriver;

// Selector to get the status of driver-related actions
export const selectDriverStatus = state => state.drivers.status;

// Selector to get the error for driver-related actions
export const selectDriverError = state => state.drivers.error;
