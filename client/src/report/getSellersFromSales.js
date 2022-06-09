export const getSellersFromSales = (sales) => {
  const sellersArray = [];
  // separa as vendas para cada vendedor.
  sales.forEach(sale => {
    if(sellersArray.some(seller => seller.name === sale.seller)) {
      let seller = sellersArray.find(seller => seller.name === sale.seller);
      seller.sales.push(sale);
    } else {
      sellersArray.push({
        name: sale.seller,
        sales: [sale],
      })
    }
  });

  sellersArray.map(seller => {
    seller.name = seller.name.split(' ')[0];
    return seller;
  });
  return sellersArray;
}