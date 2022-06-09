import { DateTime } from 'luxon';

export const getMonthSales = (salesArray) => {
  const monthSalesArray = salesArray.filter(sale => {
    const currentMonthDateTime = DateTime.now().setZone('America/Bahia').startOf('month');
    const saleMonthDateTime = DateTime.fromISO(sale.date, { zone: 'America/Bahia' }).startOf('month');
    return currentMonthDateTime.toMillis() === saleMonthDateTime.toMillis();
  });

  if (monthSalesArray.length > 0) {
    return monthSalesArray;
  } else {
    return undefined;
  }
}