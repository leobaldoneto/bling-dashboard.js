import { readFileSync  } from 'fs';

import { Dashboard } from '../components/dashboard';
import { getDashboardData } from '../report/SalesReport';

export default function Home({ dashboardData }) {
  return (
    <Dashboard store={dashboardData} />
  ) 
}

export async function getServerSideProps({query, res}) {
  const { storeId } = query;
  const storesArray = JSON.parse(readFileSync('./stores.json'));
  const storeData = storesArray[storeId];
  const dashboardData = await getDashboardData(storeData.apiKey);

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120'
  );

  return { props: { dashboardData } }
}