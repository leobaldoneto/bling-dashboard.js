import { DateTime } from 'luxon';

export const getMonthSales = (salesArray) => {
  return salesArray.filter(sale => {
    const currentMonthDateTime = DateTime.now().setZone('America/Bahia').startOf('month');
    const saleMonthDateTime = DateTime.fromISO(sale.date, { zone: 'America/Bahia' }).startOf('month');
    return currentMonthDateTime.toMillis() === saleMonthDateTime.toMillis();
  })
}