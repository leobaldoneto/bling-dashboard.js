import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { DateTime } from 'luxon';

import { getMonthAccumulatedValues } from '../../../utils/getMonthAccumulatedValues';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  Plugins: {
    tittle: {
      display: true,
      text: 'Vendas por Dia',
    },
  },
};

export function SalesChart({ monthSalesArray, lastMonthSalesArray, lastYearMonthSalesArray, meta }){
  const [data, setData] = useState(null);

  useEffect(()=> {
    const todayDateTime = DateTime.local({zone: 'America/Bahia'});
    const daysInMonth = todayDateTime.daysInMonth;
    const daysInMonthArray = Array.from(Array(daysInMonth), (_, key) => ++key);

    const salesPerDayToGoal = Math.floor(( meta / daysInMonthArray.length ));

    const accumulatedGoalPerDayInMonthArray = Array.from(Array(daysInMonth), (_, key) => salesPerDayToGoal * ++key);

    const monthAccumulatedSalesArray = getMonthAccumulatedValues(monthSalesArray);
    const lastMonthAccumulatedSalesArray = getMonthAccumulatedValues(lastMonthSalesArray);
    const lastYearMonthAccumulatedSalesArray = getMonthAccumulatedValues(lastYearMonthSalesArray);
    const data = {
      labels: daysInMonthArray,
      datasets: [
        {
          label: 'Mês atual',
          data: monthAccumulatedSalesArray,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Meta',
          data: accumulatedGoalPerDayInMonthArray,
          borderColor: 'rgb(0, 102, 204)',
          backgroundColor: 'rgba(0, 204, 255, 0.5)',
          borderDash: [5, 5],
          pointBorderWidth: 0,
          pointBackgroundColor: '#0000'
        },
        {
          label: 'Mês anterior',
          data: lastMonthAccumulatedSalesArray,
          borderColor: 'rgb(197, 86, 34)',
          backgroundColor: 'rgba(200, 130, 37, 0.5)',
          borderDash: [5, 5],
          pointBorderWidth: 0,
          pointBackgroundColor: '#0000'
        },
        {
          label: 'Ano anterior',
          data: lastYearMonthAccumulatedSalesArray,
          borderColor: 'rgb(7, 173, 23)',
          backgroundColor: 'rgba(52, 218, 104, 0.5)',
          borderDash: [5, 5],
          pointBorderWidth: 0,
          pointBackgroundColor: '#0000'
        },
      ],
    }

    setData(data);
  }, [monthSalesArray, meta]);


  return (
    data && <Line options={options} data={data} />
  )
}