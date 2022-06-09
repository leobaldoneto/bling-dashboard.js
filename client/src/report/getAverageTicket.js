export const getAverageTicket = (salesArray) => {
  const salesSum = salesArray.reduce( (sum, sale) => {
    return sum + sale.saleValue;
  }, 0);

  return salesSum / salesArray.length;
}