// const bling = require('../api/bling')
import { bling } from '../api/bling';

import { getDaySales } from './getDaySales';
import { getMonthSales } from './getMonthSales';
import { getAverageTicket } from './getAverageTicket';
import { getProductsPerSale } from './getProductsPerSale';
import { countProducts } from './countProducts';
import { getSalesTotalValue } from './getSalesTotalValue';
import { getSellersFromSales } from './getSellersFromSales';
import { GetDateString } from '../utils/GetDateString';
import { getItemsCount } from './getItemsCount';

export const getDashboardData = async () => {
  try {
    let salesObject = await bling.pedidos.getAll(
      `idSituacao[9];dataEmissao[${GetDateString(-30)} TO ${GetDateString()}]`,
      1000
    );
    salesObject = salesObject.pedidos;
    const salesArray = [];
    for (let sale of salesObject) {
      let pedido = sale.pedido;
      if(pedido.totalvenda > 0){
        salesArray.push(
          {
            date: pedido.data,
            saleValue: parseFloat(pedido.totalvenda),
            seller: pedido.vendedor,
            productCount: countProducts(pedido)
          }
        )
      }

    }
    // Day
    const daySalesArray = getDaySales(salesArray);
    const dayTotalSales = daySalesArray ? getSalesTotalValue(daySalesArray) : 0;
    const dayAverageSales = daySalesArray ? getAverageTicket(daySalesArray) : 0;
    const dayItemsCount = daySalesArray ? getItemsCount(daySalesArray) : 0;
    const dayProductsPerSale = daySalesArray ? getProductsPerSale(daySalesArray) : 0;

    // Month
    const monthSalesArray = getMonthSales(salesArray);
    const monthTotalSales = monthSalesArray ? getSalesTotalValue(monthSalesArray) : 0;
    const monthAverageSales = monthSalesArray ? getAverageTicket(monthSalesArray) : 0;
    const monthItemsCount = monthSalesArray ? getItemsCount(monthSalesArray) : 0;
    const monthProductsPerSale = monthSalesArray ? getProductsPerSale(monthSalesArray) : 0;

    // Sellers
    const daySellersArray = daySalesArray ? getSellersFromSales(daySalesArray) : [];
    const monthSellersArray = monthSalesArray ? getSellersFromSales(monthSalesArray) : [];

    daySellersArray.forEach(seller => {
      seller.totalSales = getSalesTotalValue(seller.sales);
      seller.averageSales = getAverageTicket(seller.sales);
      seller.itemsCount = getItemsCount(seller.sales);
      seller.productsPerSale = getProductsPerSale(seller.sales);
    });

    monthSellersArray.forEach(seller => {
      seller.totalSales = getSalesTotalValue(seller.sales);
      seller.averageSales = getAverageTicket(seller.sales);
      seller.itemsCount = getItemsCount(seller.sales);
      seller.productsPerSale = getProductsPerSale(seller.sales);
    });

    daySellersArray.sort((a,b) => b.totalSales - a.totalSales);
    monthSellersArray.sort((a,b) => b.totalSales - a.totalSales);

    return {
      dayTotalSales,
      dayAverageSales,
      dayItemsCount,
      dayProductsPerSale,

      monthTotalSales,
      monthAverageSales,
      monthItemsCount,
      monthProductsPerSale,

      daySellersArray,
      monthSellersArray,
    }
  } catch (error) {
    console.log(error);
  }
}