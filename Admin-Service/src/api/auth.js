import { poster, endpoints } from 'src/utils/axios-auth-otp';

import { ATTPL_OTP_HOST_API } from 'src/config-global';

const mapper = {
  sentOTP: ATTPL_OTP_HOST_API + endpoints.otp.sent,
  sentEmail: ATTPL_OTP_HOST_API + endpoints.email.sent,
  verifyOTP: ATTPL_OTP_HOST_API + endpoints.otp.verify,
  verifyEmail: ATTPL_OTP_HOST_API + endpoints.email.verify,
};

export function callPoster(apiType, formData) {
  const URL = mapper[apiType];
  const data = poster(URL, formData);
  return data;
}
