import Bling from 'bling-erp.js';

export const createBlingInstance = (apiKey) => {
  const bling = new Bling({
    apikey: apiKey,
    requestDelay: 1000,
  });

  return bling;
}