import { DateTime } from 'luxon';

//Retorna uma data em string no formato 14/09/20
//Se passado um parâmetro, o valor será usado voltar ou avançar a quantidade de dias e retornar String
//SE valor negativo, irá voltar os dias no tempo, se valor positivo, irá avançar no tempo
export const GetDateString = (daysToWarp = 0) => {
  const date = DateTime.local({ zone: "America/Bahia" });
  const newDate = date.plus({ days: daysToWarp });
  const dateString = newDate.toFormat('dd/MM/yyyy');
  return dateString;
}