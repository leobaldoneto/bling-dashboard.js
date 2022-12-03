import { Dashboard } from '../components/dashboard';
import { getDashboardData } from '../report/SalesReport';

export default function Home({ dashboardData }) {
  return (
    <Dashboard store={dashboardData} />
  ) 
}

export async function getServerSideProps(context) {
  const { store } = context.query;
  let apiKey = '';
  if (store === 'nastore') {
    apiKey = process.env.NA_STORE_KEY;
  } else if (store === 'viaunica') {
    apiKey = process.env.VIA_STORE_KEY;
  }
  /* const response = await fetch(`http://localhost:3000/api/dashboard-data/${store}`);
  const dashboardData = await response.json(); */
  const dashboardData = await getDashboardData(apiKey);
  console.log('dashboardData: ', dashboardData);

  return { props: { dashboardData } }
}