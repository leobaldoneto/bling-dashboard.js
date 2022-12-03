import { getDashboardData } from '../../report/SalesReport';

export default async function handler(req, res) {
  const store = req.params;
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120'
    );
  const data = await getDashboardData(apiKey);
  res.status(200).json(data);
}