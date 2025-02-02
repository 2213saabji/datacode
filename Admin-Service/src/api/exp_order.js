import axios from 'src/utils/axios';
import { endpoints } from 'src/utils/axios-exp_ms';

import { ATTPL_EXPMS_HOST_API } from 'src/config-global';

// Get API Call For check
// ----------------------------------------------------------------------
export async function checkPayment(mobileNo) {
  const URL = `${ATTPL_EXPMS_HOST_API + endpoints.exp_order.check}/${mobileNo}`;
  try {
    const response = await axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error checking:', error);
    throw error;
  }
}

// Post API Call For Order
// ----------------------------------------------------------------------

export async function createOrder(Data) {
  const URL = ATTPL_EXPMS_HOST_API + endpoints.exp_order.create;
  try {
    const response = await axios.post(URL, Data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Order:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

// Update API Call For Invoice

export async function updateOrder(orderId, Data) {
  const URL = `${ATTPL_EXPMS_HOST_API + endpoints.exp_order.update}/${orderId}`;

  try {
    const response = await axios.put(URL, Data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Order:', error);
    throw error;
  }
}
