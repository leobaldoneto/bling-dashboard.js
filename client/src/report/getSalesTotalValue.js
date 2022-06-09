export const getSalesTotalValue = (salesArray) => {
  const totalValue = salesArray.reduce( (sum, sale) => {
    return sum + sale.saleValue;
  }, 0)
  return totalValue;
}