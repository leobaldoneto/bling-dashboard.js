export const getItemsCount = (salesArray) => {
  const itemsCount = salesArray.reduce( (sum, sale) => sum + sale.productCount, 0);
  return itemsCount;
}