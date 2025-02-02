import ApiCaller from "../../../services/ApiCaller";

  export const fetchPartyList = async () => {
    try {
      const response = await ApiCaller.get('/party/fetchAll', 'ems');
      return response.data; 
    } catch (error) {
      return error;
    }
  }