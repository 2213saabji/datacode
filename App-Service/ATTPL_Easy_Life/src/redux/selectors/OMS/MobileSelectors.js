// Selectors
export const selectMobileOtp = state => state.mobileOtp;
export const selectOtpCodeId = state => state.mobileOtp.otpCodeId;
export const selectRefId = state => state.mobileOtp.refId;
export const selectLoading = state => state.mobileOtp.loading;
export const selectError = state => state.mobileOtp.error;
export const selectMessage = state => state.mobileOtp.message;
