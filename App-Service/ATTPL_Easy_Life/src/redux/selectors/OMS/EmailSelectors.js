// Selectors
export const selectEmailOtp = state => state.emailOtp;
export const selectEmailOtpCodeId = state => state.emailOtp.otpCodeId;
export const selectEmailLoading = state => state.emailOtp.loading;
export const selectEmailError = state => state.emailOtp.error;
export const selectEmailMessage = state => state.emailOtp.message;
