import { DateTime } from 'luxon';

export const getMonthSales = (salesArray) => {
  const monthSalesArray = salesArray.filter(sale => {
    const currentMonth = DateTime.now().setZone('America/Bahia').month;
    const saleMonth = DateTime.fromISO(sale.date, { zone: 'America/Bahia' }).month;
    return saleMonth === currentMonth;
  });

  if (monthSalesArray.length > 0) {
    return monthSalesArray;
  } else {
    return undefined;
  }
}