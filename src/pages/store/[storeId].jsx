import { readFileSync  } from 'fs';

import { Dashboard } from '../../components/dashboard';
import { getDashboardData } from '../../report/SalesReport';

export default function Home({ dashboardData }) {
  return (
    <Dashboard store={dashboardData} />
  ) 
}

export async function getServerSideProps({query, res}) {
  const { storeId } = query;
  const data = await readFileSync('./stores.json');
  const storesArray = await JSON.parse(data);
  const storeData = storesArray[storeId];
  let dashboardData = await getDashboardData(storeData.apiKey);
  dashboardData = {
    storeName: storeData.name,
    storeMeta: storeData.meta,
    ...dashboardData
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120'
  );

  return { props: { dashboardData } }
}