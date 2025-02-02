import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ATTPL_UMS_HOST_API,
  ATTPL_TMS_HOST_API,
  ATTPL_EMS_HOST_API,
  ATTPL_EXPMS_HOST_API,
  ATTPL_CMS_HOST_API,
  ATTPL_BMS_HOST_API,
  ATTPL_AMS_HOST_API,
  ATTPL_VMS_HOST_API,
  ATTPL_CHAT_HOST_API,
  LANDING_SERVICE_URL,
  SMS_URL,
  PMS_URL,
  SURVEY_MS_URL,
  TEMPLATE_MS_URL,
  ATTPL_OTP_HOST_API,
} from '../config/config';

/**
 * Class responsible for making HTTP requests to various microservices.
 */
class ApiCaller {
  /**
   * Retrieves the base URL for a given microservice.
   * @param {string} serviceName - The name of the microservice.
   * @returns {string} The base URL of the microservice.
   * @throws Will throw an error if the service name is unknown.
   */
  static getHost(serviceName) {
    switch (serviceName) {
      case 'ums':
        return ATTPL_UMS_HOST_API;
      case 'tms':
        return ATTPL_TMS_HOST_API;
      case 'ems':
        return ATTPL_EMS_HOST_API;
      case 'expms':
        return ATTPL_EXPMS_HOST_API;
      case 'cms':
        return ATTPL_CMS_HOST_API;
      case 'bms':
        return ATTPL_BMS_HOST_API;
      case 'ams':
        return ATTPL_AMS_HOST_API;
      case 'vms':
        return ATTPL_VMS_HOST_API;
      case 'chat':
        return ATTPL_CHAT_HOST_API;
      case 'landing':
        return LANDING_SERVICE_URL;
      case 'sms':
        return SMS_URL;
      case 'pms':
        return PMS_URL;
      case 'survey':
        return SURVEY_MS_URL;
      case 'template':
        return TEMPLATE_MS_URL;
      case 'otp':
        return ATTPL_OTP_HOST_API;
      default:
        throw new Error(`Unknown service: ${serviceName}`);
    }
  }

  /**
   * Retrieves the Bearer token from AsyncStorage.
   * @returns {Promise<string|null>} The Bearer token, or null if not found.
   */
  static async getToken() {
    try {
      return await AsyncStorage.getItem('accessToken');
    } catch (error) {
      console.error('Error fetching token from AsyncStorage:', error);
      return null;
    }
  }

  /**
   * Makes a GET request to the specified route.
   * The route is automatically encoded to handle special characters.
   * @param {string} route - The endpoint to send the GET request to.
   * @param {string} [serviceName='default'] - The name of the microservice.
   * @param {object} [config={}] - Additional Axios request configuration.
   * @returns {Promise<import('axios').AxiosResponse>} The Axios response promise.
   */
  static async get(route, serviceName = 'default', config = {}) {
    const token = await ApiCaller.getToken();
    const encodedRoute = encodeURI(route);
    const instance = axios.create({
      baseURL: ApiCaller.getHost(serviceName),
      timeout: 100000,
      headers: {
        Accept: 'application/json',
        ...config.headers,
        ...(token && {Authorization: `Bearer ${token}`}),
      },
    });
    return instance.get(encodedRoute, config);
  }

  /**
   * Makes a POST request to the specified route with the provided data.
   * The route is automatically encoded to handle special characters.
   * @param {string} route - The endpoint to send the POST request to.
   * @param {object} data - The data to be sent in the POST request.
   * @param {string} [serviceName='default'] - The name of the microservice.
   * @param {object} [config={}] - Additional Axios request configuration.
   * @returns {Promise<import('axios').AxiosResponse>} The Axios response promise.
   * @throws Will throw an error if the request fails.
   */
  static async post(route, data, serviceName = 'default', config = {}) {
    const token = await ApiCaller.getToken();
    const encodedRoute = encodeURI(route);

    const instance = axios.create({
      baseURL: ApiCaller.getHost(serviceName),
      timeout: 100000,
      headers: {
        ...config.headers,
        ...(token && {Authorization: `Bearer ${token}`}),
      },
    });

    try {
      const response = await instance.post(encodedRoute, data, config);
      console.log(response);
      return response;
      
    } catch (error) {
      console.error('Error in API call:', error.message);
      throw error;
    }
  }

  /**
   * Makes a PUT request to the specified route with the provided data.
   * The route is automatically encoded to handle special characters.
   * @param {string} route - The endpoint to send the PUT request to.
   * @param {object} data - The data to be sent in the PUT request.
   * @param {string} [serviceName='default'] - The name of the microservice.
   * @param {object} [config={}] - Additional Axios request configuration.
   * @returns {Promise<import('axios').AxiosResponse>} The Axios response promise.
   */
  static async put(route, data, serviceName = 'default', config = {}) {
    const token = await ApiCaller.getToken();
    const encodedRoute = encodeURI(route);
console.log(ApiCaller.getHost(serviceName))
console.log(encodedRoute)
    const instance = axios.create({
      baseURL: ApiCaller.getHost(serviceName),
      timeout: 100000,
      headers: {
        ...config.headers,
        ...(token && {Authorization: `Bearer ${token}`}),
      },
    });

    return instance.put(encodedRoute, data, config);
  }

  /**
   * Makes a DELETE request to the specified route.
   * The route is automatically encoded to handle special characters.
   * @param {string} route - The endpoint to send the DELETE request to.
   * @param {string} [serviceName='default'] - The name of the microservice.
   * @param {object} [config={}] - Additional Axios request configuration.
   * @returns {Promise<import('axios').AxiosResponse>} The Axios response promise.
   */
  static async delete(route, serviceName = 'default', config = {}) {
    const token = await ApiCaller.getToken();
    const encodedRoute = encodeURI(route);

    const instance = axios.create({
      baseURL: ApiCaller.getHost(serviceName),
      timeout: 100000,
      headers: {
        ...config.headers,
        ...(token && {Authorization: `Bearer ${token}`}),
      },
    });

    return instance.delete(encodedRoute, config);
  }
}

export default ApiCaller;
