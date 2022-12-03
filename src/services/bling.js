import Bling from 'bling-erp.js';

export const createBlingInstance = (apiKey) => {
  const bling = new Bling({
    apikey: apiKey,
  });

  return bling;
}