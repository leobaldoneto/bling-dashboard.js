import { DateTime } from 'luxon';

import { createBlingInstance } from '../services/bling';

import { getDaySales } from './getDaySales';
import { getAverageTicket } from './getAverageTicket';
import { getProductsPerSale } from './getProductsPerSale';

import { getSalesTotalValue } from './getSalesTotalValue';
import { getSellersFromSales } from './getSellersFromSales';
import { getItemsCount } from './getItemsCount';
import { querySales } from './querySales';

export const getDashboardData = async (apiKey) => {
  const bling = createBlingInstance(apiKey);
  try {
    const todayDateTime = DateTime.local({zone: 'America/Bahia'});

    const monthSalesArray = await querySales(todayDateTime.startOf('month'), todayDateTime.endOf('month'), bling);

    const lastMonthStartDayDateTime = todayDateTime.set({ month: todayDateTime.month -1 }).startOf('month');
    const lastMonthEndDayDateTime = todayDateTime.set({ month: todayDateTime.month -1 }).endOf('month');
    const lastMonthSalesArray = await querySales(lastMonthStartDayDateTime, lastMonthEndDayDateTime, bling);

    const lastYearMonthStartDayDateTime = todayDateTime.set({ year: todayDateTime.year -1 }).startOf('month');
    const lastYearMonthEndDayDateTime = todayDateTime.set({ year: todayDateTime.year -1 }).endOf('month');
    const lastYearMonthSalesArray = await querySales(lastYearMonthStartDayDateTime, lastYearMonthEndDayDateTime, bling);


    // Day
    const daySalesArray = getDaySales(monthSalesArray);
    const dayTotalSales = daySalesArray ? getSalesTotalValue(daySalesArray) : 0;
    const daySalesCount = daySalesArray ? daySalesArray.length : 0;
    const dayAverageSales = daySalesArray ? getAverageTicket(daySalesArray) : 0;
    const dayItemsCount = daySalesArray ? getItemsCount(daySalesArray) : 0;
    const dayProductsPerSale = daySalesArray ? getProductsPerSale(daySalesArray) : 0;

    // Month
    // const monthSalesArray = getMonthSales(monthSalesArray);
    const monthTotalSales = monthSalesArray ? getSalesTotalValue(monthSalesArray) : 0;
    const monthSalesCount = monthSalesArray ? monthSalesArray.length : 0;
    const monthAverageSales = monthSalesArray ? getAverageTicket(monthSalesArray) : 0;
    const monthItemsCount = monthSalesArray ? getItemsCount(monthSalesArray) : 0;
    const monthProductsPerSale = monthSalesArray ? getProductsPerSale(monthSalesArray) : 0;

    // Sellers
    const daySellersArray = daySalesArray ? getSellersFromSales(daySalesArray) : [];
    const monthSellersArray = monthSalesArray ? getSellersFromSales(monthSalesArray) : [];

    daySellersArray.forEach(seller => {
      seller.totalSales = getSalesTotalValue(seller.sales);
      seller.salesCount = seller.sales.length;
      seller.averageSales = getAverageTicket(seller.sales);
      seller.itemsCount = getItemsCount(seller.sales);
      seller.productsPerSale = getProductsPerSale(seller.sales);
    });

    monthSellersArray.forEach(seller => {
      seller.totalSales = getSalesTotalValue(seller.sales);
      seller.salesCount = seller.sales.length;
      seller.averageSales = getAverageTicket(seller.sales);
      seller.itemsCount = getItemsCount(seller.sales);
      seller.productsPerSale = getProductsPerSale(seller.sales);
    });

    daySellersArray.sort((a,b) => b.totalSales - a.totalSales);
    monthSellersArray.sort((a,b) => b.totalSales - a.totalSales);

    return {
      daySalesArray,
      dayTotalSales,
      daySalesCount,
      dayAverageSales,
      dayItemsCount,
      dayProductsPerSale,

      monthSalesArray,
      monthTotalSales,
      monthSalesCount,
      monthAverageSales,
      monthItemsCount,
      monthProductsPerSale,

      lastMonthSalesArray,
      lastYearMonthSalesArray,

      daySellersArray,
      monthSellersArray,
    }
  } catch (error) {
    console.log(error);
  }
}