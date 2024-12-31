import Snowfall from 'react-snowfall'
import stores from '../../services/stores'

import { Dashboard } from '../../components/dashboard';
import { getDashboardData } from '../../report/SalesReport';

let cache = {};
let cacheExpiry = 300 * 1000; // 5 minutes

export default function Home({ dashboardData }) {
  return (
    <>
      {/* <Snowfall /> */}
      <Dashboard store={dashboardData} />
    </>
  ) 
}

export async function getServerSideProps({query}) {
  const { storeId } = query;
  const storesArray = stores;
  const storeData = storesArray[storeId];

  const timeSinceLastCache = cache[storeId] ? Date.now() - cache[storeId].timestamp : cacheExpiry;
  if (cache[storeId] && timeSinceLastCache < cacheExpiry) {
    return { props: { dashboardData: cache[storeId].data } }
  }

  let dashboardData = await getDashboardData(storeData.apiKey);
  dashboardData = {
    storeName: storeData.name,
    storeMeta: storeData.meta,
    ...dashboardData
  }

  cache[storeId] = {
    data: dashboardData,
    timestamp: Date.now()
  };

  return { props: { dashboardData } }
}