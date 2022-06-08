import Bling from 'bling-erp.js';

export const bling = new Bling({
  apikey: 'willbechangedinproxy',
});

bling.axiosInstance.defaults.baseURL = 'http://localhost:3001/Api/v2/';