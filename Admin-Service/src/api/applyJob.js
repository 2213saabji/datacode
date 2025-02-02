import axios from 'axios';

import { endpoints } from 'src/utils/axios-cms';

import { ATTPL_CMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// made by gurpreet
// Api Call For Job Application Creation
export async function createJobApplication(formData, accessToken) {
  const URL = ATTPL_CMS_HOST_API + endpoints.jobApplication.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}

// Api Call For Job Application Updation
export async function updateJobApplication(userId, formData, accessToken) {
  const URL = ATTPL_CMS_HOST_API + endpoints.jobApplication.update;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}
