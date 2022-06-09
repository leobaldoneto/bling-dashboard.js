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

const daysInMonth = [];
for (let i = 0; i < DateTime.local({zone: 'America/Bahia'}).daysInMonth; i++) {
  daysInMonth.push(i+1);
}

export function SalesChart({ salesArray }){
  const [data, setData] = useState(null);

  useEffect(()=> {
    const salesValueArray = daysInMonth.map(day => {
      const dayDateTime = DateTime.local({zone: 'America/Bahia'}).set({ day });
      const daySales = getDaySales(salesArray, dayDateTime.toISODate());
      const daySalesTotalValue = getSalesTotalValue(daySales);
      return daySalesTotalValue;
    });

    const data = {
      labels: daysInMonth,
      datasets: [
        {
          label: 'Mês atual',
          data: salesValueArray,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
    }

    setData(data);
  }, []);


  return (
    data && <Line options={options} data={data} />
  )
}