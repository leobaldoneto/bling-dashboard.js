import { DateTime } from 'luxon';

import { getDaySales } from '../report/getDaySales';
import { getSalesTotalValue } from '../report/getSalesTotalValue';


export const getMonthAccumulatedValues = (monthSalesArray) => {
  if (!monthSalesArray || monthSalesArray.length === 0) {
    return [];
  }

  const todayDateTime = DateTime.local({zone: 'America/Bahia'});
  const monthDateTime = DateTime.fromISO(monthSalesArray[0].date, { zone: 'America/Bahia' });
  const daysInMonth = monthDateTime.daysInMonth;
  const accumulatedSalesArray = [];
  for (let day = 1, accumulatedSalesTotal = 0; day <= daysInMonth; day++) {
    const salesDayDateTime = monthDateTime.set({ day });
    const daySalesArray = getDaySales(monthSalesArray, salesDayDateTime.toISODate());
    let totalDaySalesValue = 0;
    if(daySalesArray){
      totalDaySalesValue = getSalesTotalValue(daySalesArray);
    }

    accumulatedSalesTotal += totalDaySalesValue;
    accumulatedSalesArray[day-1] = accumulatedSalesTotal;

    if (
      salesDayDateTime.year === todayDateTime.year &&
      salesDayDateTime.month === todayDateTime.month && 
      salesDayDateTime.day >= todayDateTime.day ) {
        break;
      }
  }
  return accumulatedSalesArray;
}