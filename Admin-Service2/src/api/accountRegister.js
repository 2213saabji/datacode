// import useSWR from 'swr';
// import { useMemo } from 'react';
import { poster, endpoints } from 'src/utils/axios-auth';

const mapper = {
  register: endpoints.auth.register,
  registerfP: endpoints.auth.forgotpassword,
};

export function registerPoster(apiType, formData) {
  const URL = mapper[apiType];
  const data = poster(URL, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
}
