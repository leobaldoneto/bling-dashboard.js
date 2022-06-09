import { DateTime } from 'luxon';

export const getDaySales = (salesArray) => {
  const daySalesArray = salesArray.filter(sale => {
    const currentDayDateTime = DateTime.now().setZone('America/Bahia').startOf('day');
    const saleDayDateTime = DateTime.fromISO(sale.date, {zone: 'America/Bahia'}).startOf('day');
    return currentDayDateTime.toMillis() === saleDayDateTime.toMillis();
  });
  if (daySalesArray.length > 0) {
    return daySalesArray;
  } else {
    return undefined;
  }
  
}