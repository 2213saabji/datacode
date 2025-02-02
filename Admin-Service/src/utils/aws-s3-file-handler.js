import axios from 'axios';

import {
  ATTPL_UMS_HOST_API,
  ATTPL_BMS_HOST_API,
  ATTPL_PMS_HOST_API,
  ATTPL_CMS_HOST_API,
  ATTPL_EMS_HOST_API,
  ATTPL_TMS_HOST_API,
  ATTPL_LMS_HOST_API,
  ATTPL_EXPMS_HOST_API,
} from 'src/config-global';

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

export const uploadclaimFileInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_EXPMS_HOST_API}/expense/claims/upload-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const uploadfarmereagriFileInAWSS3 = async (data) => {
  try {
    const response = await axios.post(
      `${ATTPL_EMS_HOST_API}/agriculture/Appointment/upload-image`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};
export const deletefarmereagriFileFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(
      `${ATTPL_EMS_HOST_API}/agriculture/Appointment/delete-image`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};
export const uploadsmsFileInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_EXPMS_HOST_API}/expense/claims/upload-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const uploadclaimFilesInAWSS3 = async (data) => {
  try {
    const response = await axios.post(
      `${ATTPL_EXPMS_HOST_API}/expense/claims/upload-images`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteFileFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_EXPMS_HOST_API}/expense/claims/delete-image`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteFilesFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(
      `${ATTPL_EXPMS_HOST_API}/expense/claims/delete-images`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const uploadUserFileInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_UMS_HOST_API}/user/upload-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const uploadUserFilesInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_UMS_HOST_API}/user/upload-images`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteUserFileFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_UMS_HOST_API}/user/delete-image`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteUserFilesFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_UMS_HOST_API}/user/delete-images`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

// for blog-----------------------------------

export const uploadBlogFileInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_BMS_HOST_API}/blog/upload-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const uploadblogFilesInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_BMS_HOST_API}/blog/upload-images`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteBlogFileFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_BMS_HOST_API}/blog/delete-image`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

// project management attchment upload

export const uploadProjectFilesInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_PMS_HOST_API}/project/upload-images`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const uploadappoinmentFilesInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_CMS_HOST_API}/doctor/upload-images`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const uploaddesireappoinmentFilesInAWSS3 = async (data) => {
  try {
    const response = await axios.post(
      `${ATTPL_EMS_HOST_API}/desireAppointment/upload-images`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteappoinmentFileFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_CMS_HOST_API}/user/delete-image`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteappoinmentFilesFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_CMS_HOST_API}/user/delete-images`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

// Transport Management
export const uploadTMSFileInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_TMS_HOST_API}/delivery/upload-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const uploadTMSFilesInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_TMS_HOST_API}/delivery/upload-images`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteTMSFileFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_TMS_HOST_API}/delivery/delete-image`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteTMSFilesFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_TMS_HOST_API}/delivery/delete-images`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
// LMS user 
export const uploadLMSFileInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/serviceProvider/upload-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const uploadLMSFilesInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/serviceProvider/upload-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
 
export const deleteLMSFileFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/serviceProvider/upload-image`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
 
export const deleteLMSFilesFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/serviceProvider/upload-image`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
// LMS Document Image Uploading
export const uploadLMSDOCUMENTFileInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/documents/upload-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const uploadLMSDOCUMENTFilesInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/documents/upload-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
 
export const deleteLMSDOCUMENTFileFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/documents/upload-image`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
 
export const deleteLMSDOCUMENTFilesFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/documents/upload-image`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
// LMS Document Video Uploading
export const uploadLMSVIDEOInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/documents/upload-video`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const uploadLMSVIDEOsInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/documents/upload-video`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
 
export const deleteLMSVIDEOFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/documents/upload-video`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
 
export const deleteLMSVIDEOsFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/documents/upload-video`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
// LMS Document Pdf Uploading
export const uploadLMSPdfInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/documents/upload-pdf`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const uploadLMSPdfsInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/documents/upload-pdf`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
 
export const deleteLMSPdfFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/documents/upload-pdf`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
 
export const deleteLMSPdfsFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/documents/upload-pdf`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
// LMS Contract Uploading
export const uploadLMSContractInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/contractDetails/upload-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const uploadLMSContractsInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/contractDetails/upload-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
 
export const deleteLMSContractFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/contractDetails/delete-image`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
 
export const deleteLMSContractsFromAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_LMS_HOST_API}/contractDetails/delete-image`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};