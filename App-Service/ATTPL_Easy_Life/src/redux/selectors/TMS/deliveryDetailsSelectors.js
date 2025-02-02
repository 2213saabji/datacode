import {createSelector} from 'reselect';

// Basic selector to get the auth state
const selectAuthState = state => state.delivery;

// Selector to get the user
export const selectDeliveryData = createSelector([selectAuthState], delivery => delivery.data);
