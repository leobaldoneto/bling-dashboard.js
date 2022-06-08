export const getAverageTicket = (salesArray) => {
  const averageTicket = salesArray.reduce( (sum, sale) => {
    return sum + sale.saleValue;
  }, 0);

  return averageTicket;
}