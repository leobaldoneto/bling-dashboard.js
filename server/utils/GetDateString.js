//Retorna uma data em string no formato 14/09/20
//Se passado um parâmetro, o valor será usado voltar ou avançar a quantidade de dias e retornar String
//SE valor negativo, irá voltar os dias no tempo, se valor positivo, irá avançar no tempo
const GetDateString = (daysToWarp = 0) => {
  let todayDate = new Date();
  //Se daysago estiver setado
  if (typeof daysToWarp !== 0) {
    let warpedMili = Date.now() + daysToWarp * 86400000; //realiza o warp dos dias
    todayDate = new Date(warpedMili);
  }

  // converte para UTC-3
  let brazilDate = convertTZ(todayDate, "America/Sao_Paulo") // current date-time in SP.

  //define string com a data
  let todayString =
    ('0' + brazilDate.getDate()).slice(-2) +
    '/' +
    ('0' + (brazilDate.getMonth() + 1)).slice(-2) +
    '/' +
    brazilDate.getFullYear();
  return todayString;
};

function convertTZ(date, tzString) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

module.exports = GetDateString;
