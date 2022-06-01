'use strict';

const blingerp = require('bling-erp.js')
const GetDateString = require('../utils/GetDateString.js')
const Localization = require('../utils/Localization.js')
const Sale = require('../models/Sale.js')
const Seller = require('../models/Seller.js')

/*Essa função irá gerar todas as variaveis necessárias para gerar
 * todas as strings que serão utilizadas no relatório
 *
 */

const SalesReport = async function (storeName, apikey) {
  let daySales = 0; // Vendas do dia na loja
  let monthSales = 0; // Vendas no mês na loja
  let salesSum = 0; // somatório das vendas
  let averageTicket; // ticket médio
  let monthSalesQuantity = 0; // quantidade de vendas no mês
  let daySalesQuantity = 0; // quantidade de vendas no dia
  let salesArray = [];
  let storeData; //
  let name = storeName;
  let sellersArray = [];

  var viaunica = new blingerp({ apikey });

  // Recupera 31 dias de vendas em um array de objetos do tipo Sale
  try {
    let salesObject = await viaunica.pedidos.getAll(
      `idSituacao[9];dataEmissao[${GetDateString(-30)} TO ${GetDateString()}]`,
      1000
    );
    salesObject = salesObject.pedidos;

    for (let sale of salesObject) {
      let pedido = sale.pedido;
      if(pedido.totalvenda > 0){
        salesArray.push(
          new Sale(pedido.data, pedido.totalvenda, pedido.vendedor)
        );
      }

    }
  } catch (error) {
    console.log(error);
  }

  //dateArray [dia, mês, ano]
  let dateArray = GetDateString().split('/');
  //Mês de 01 até 12
  let todayMonthString = dateArray[1];

  // LOOP - Calcula os somatórios
  for (let sale of salesArray) {
    //Se for venda do mês
    if (sale.date.split('-')[1] == todayMonthString) {
      monthSales += sale.saleValue;
      monthSalesQuantity++;
    }

    //Se for venda do dia. Formato ano-mês-dia
    if (`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}` == sale.date) {
      daySales += sale.saleValue;
      daySalesQuantity++;

      //Gera um array de vendedores e soma suas vendas
      if(!sellersArray.some(e=>e.name === sale.seller)){
        sellersArray.push(new Seller(sale.seller));
      }
      sellersArray.map(seller=>{
        if(seller.name === sale.seller){
          seller.totalSell += sale.saleValue;
        }
      });
    }

    //Soma todas as vendas (de 31 dias no caso)
    salesSum += sale.saleValue;
  }

  //ordena os vendedores
  sellersArray.sort((a,b)=>{
    if(a.totalSell > b.totalSell){
      return -1;
    } else if (a.totalSell < b.totalSell){
      return 1;
    } else {
      return 0;
    }
  });

  //calcula do ticket médio
  averageTicket = salesSum / salesArray.length;

  //mostra o resultado
  storeData = {
    monthSales: Localization(monthSales),
    daySales: Localization(daySales),
    averageTicket: Localization(averageTicket),
    monthSalesQuantity,
    daySalesQuantity,
    sellersArray,
    name,
  };
  return storeData;
}

module.exports = SalesReport