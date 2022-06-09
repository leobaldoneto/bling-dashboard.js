import Bling from 'bling-erp.js';

export const bling = new Bling({
  apikey: 'willbechangedinproxy',
});

bling.axiosInstance.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;