export const getProductsPerSale = (salesArray) => {
  const productPerSale = salesArray.reduce( (sum, sale) => sum + sale.productCount, 0) / salesArray.length;
  return productPerSale.toFixed(2);
}