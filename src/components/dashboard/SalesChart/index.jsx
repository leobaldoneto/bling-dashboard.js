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
import { getSalesTotalValue } from '../../../report/getSalesTotalValue';
import { getDaySales } from '../../../report/getDaySales';

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

export function SalesChart({ salesArray, meta }){
  const [data, setData] = useState(null);

  useEffect(()=> {
    const todayDateTime = DateTime.local({zone: 'America/Bahia'})
    const todayDayInMonth = todayDateTime.day;
    const daysInMonth = todayDateTime.daysInMonth;
    const daysInMonthArray = Array.from(Array(daysInMonth), (_, key) => ++key);

    const salesPerDayToGoal = Math.floor(( meta / daysInMonthArray.length ));

    const accumulatedGoalPerDayInMonthArray = Array.from(Array(daysInMonth), (_, key) => salesPerDayToGoal * ++key);

    const accumulatedSalesArray = [];
    for (let day = 1, accumulatedSalesTotal = 0; day <= daysInMonth; day++) {
      const salesDayDateTime = todayDateTime.set({ day });
      const daySalesArray = getDaySales(salesArray, salesDayDateTime.toISODate());
      const totalDaySalesValue = getSalesTotalValue(daySalesArray);

      accumulatedSalesTotal += totalDaySalesValue;
      accumulatedSalesArray[day-1] = accumulatedSalesTotal;

      if (salesDayDateTime.day > todayDayInMonth) break;
    }
    const data = {
      labels: daysInMonthArray,
      datasets: [
        {
          label: 'Mês atual',
          data: accumulatedSalesArray,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Meta',
          data: accumulatedGoalPerDayInMonthArray,
          borderColor: 'rgb(0, 102, 204)',
          backgroundColor: 'rgba(0, 204, 255, 0.5)',
        }
      ],
    }

    setData(data);
  }, [salesArray, meta]);


  return (
    data && <Line options={options} data={data} />
  )
}