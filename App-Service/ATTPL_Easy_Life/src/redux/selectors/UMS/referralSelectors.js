export const selectReferralToken = state => state.referral.referralToken;

export const selectAvailableRedemptions = state =>
  state.referral.availableRedemptions;

export const selectLoading = state => state.referral.loading;

export const selectError = state => state.referral.error;
