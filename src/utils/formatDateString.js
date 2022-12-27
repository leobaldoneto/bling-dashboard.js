// Retorna uma data em string no formato 14/09/20
// Recebe uma instância do luxon
export const formatDateString = date => {
  const dateString = date.toFormat('dd/MM/yyyy');
  return dateString;
}