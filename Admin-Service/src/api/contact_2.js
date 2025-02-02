import { poster, endpoints } from 'src/utils/axios-contact';

import { ATTPL_OTP_HOST_API, ATTPL_CMS_HOST_API } from 'src/config-global';

const mapper = {
  sentOTP: ATTPL_OTP_HOST_API + endpoints.otp.sent,
  sentEmail: ATTPL_OTP_HOST_API + endpoints.email.sent,
  verifyOTP: ATTPL_OTP_HOST_API + endpoints.otp.verify,
  verifyEmail: ATTPL_OTP_HOST_API + endpoints.email.verify,
  create: ATTPL_CMS_HOST_API + endpoints.contact.create,
};

export function callPoster(apiType, formData) {
  const URL = mapper[apiType];
  const data = poster(URL, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(data);
  return data;
}
