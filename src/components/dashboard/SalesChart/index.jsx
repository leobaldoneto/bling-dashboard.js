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

export function SalesChart({ salesArray }){
  const [data, setData] = useState(null);

  useEffect(()=> {
    const acumulatedSalesArray = [];

    const daysInMonth = [];
    for (let i = 0; i < DateTime.local({zone: 'America/Bahia'}).daysInMonth; i++) {
      daysInMonth.push(i+1);
    }

    const meta = process.env.NEXT_PUBLIC_STORE_NAME;
    const salesPerDayToSucess = Math.floor(( meta / daysInMonth.length ));

    const averageMetaArray = [];
    let metaSum = 0;
    daysInMonth.forEach(() => {
      averageMetaArray.push( 
      metaSum += salesPerDayToSucess
      )});

    daysInMonth.reduce((acumulated, day, index) => {
      const dayDateTime = DateTime.local({zone: 'America/Bahia'}).set({ day });
      const daySales = getDaySales(salesArray, dayDateTime.toISODate());
      const daySalesTotalValue = getSalesTotalValue(daySales);
      const newAcumulated = acumulated + daySalesTotalValue;
      return acumulatedSalesArray[index] = newAcumulated;
    }, 0);

    const data = {
      labels: daysInMonth,
      datasets: [
        {
          label: 'Mês atual',
          data: acumulatedSalesArray,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Meta',
          data: averageMetaArray,
          borderColor: 'rgb(0, 102, 204)',
          backgroundColor: 'rgba(0, 204, 255, 0.5)',
        }
      ],
    }

    setData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    data && <Line options={options} data={data} />
  )
}