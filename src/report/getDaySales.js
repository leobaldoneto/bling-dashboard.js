import { DateTime } from 'luxon';

export const getDaySales = (salesArray, isoDateString = DateTime.now().setZone('America/Bahia').toISO()) => {
  const daySalesArray = salesArray.filter(sale => {
    const dayDateTime = DateTime.fromISO(isoDateString).setZone('America/Bahia').startOf('day');
    const saleDayDateTime = DateTime.fromISO(sale.date, {zone: 'America/Bahia'}).startOf('day');
    return dayDateTime.toMillis() === saleDayDateTime.toMillis();
  });
  if (daySalesArray.  length > 0) {
    return daySalesArray;
  } else {
    return null;
  }
  
}