export const countProducts = (pedido) => {
  const productCount = pedido.itens.reduce( (sum, item) => {
    return sum + parseInt(item.item.quantidade);
  }, 0);
  return productCount;
}