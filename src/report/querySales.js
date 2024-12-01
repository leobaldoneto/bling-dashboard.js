import { formatDateString } from '../utils/formatDateString';
import { countProducts } from './countProducts';

// receive start and end Dates to return sales array; Also receive Bling instance.
export const querySales = async (startDate, endDate, bling) => {
  try {
    const filterString = `idSituacao[9];dataEmissao[${formatDateString(startDate)} TO ${formatDateString(endDate)}]`;
    let salesObject = await bling.pedidos.getAll(filterString, 1000);
    salesObject = salesObject.pedidos;

    if (!salesObject) {
      return [];
    }

    const salesArray = salesObject.map((sale) => {
      const pedido = sale.pedido;
      const formattedSale = {
        date: pedido.data,
        saleValue: parseFloat(pedido.totalvenda),
        seller: pedido.vendedor,
        productCount: countProducts(pedido)
      }
      return formattedSale;
    });

    const filteredSales = salesArray.filter(sale => sale.saleValue > 0);

    return filteredSales;
  } catch (error) {
    console.log(error);
  }
}