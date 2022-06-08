// const bling = require('../api/bling')
import { bling } from '../api/bling';

import { getDaySales } from './getDaySales';
import { getMonthSales } from './getMonthSales';
import { getAverageTicket } from './getAverageTicket';
import { getProductsPerSale } from './getProductsPerSale';
import { countProducts } from './countProducts';

const GetDateString = require('../utils/GetDateString.js');

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
    const dayAverageSales = daySalesArray ? getAverageTicket(daySalesArray) : 0;
    const dayProductsPerSale = daySalesArray ? getProductsPerSale(daySalesArray) : 0;

    // Month
    const monthSalesArray = getMonthSales(salesArray);
    const monthAverageSales = monthSalesArray ? getAverageTicket(monthSalesArray) : 0;
    const monthProductsPerSale = monthSalesArray ? getProductsPerSale(daySalesArray) : 0;

    return {
      daySalesArray,
      dayAverageSales,
      dayProductsPerSale,

      monthSalesArray,
      monthAverageSales,
      monthProductsPerSale,
    }
  } catch (error) {
    console.log(error);
  }
}