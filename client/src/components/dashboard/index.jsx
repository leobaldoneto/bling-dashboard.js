import { useState, useEffect } from 'react';

import { KPICards } from './KPICards';
import { SellersTable } from './SellersTable';

import { Divider, Skeleton, Typography } from '@mui/material';

import Localization from '../../utils/Localization';

import { getDashboardData } from '../../report/SalesReport2';



export function Dashboard () {
  const [store, setStore] = useState(null);

  useEffect(() => {
    const getReport = async () => {
      const data = await getDashboardData();
      setStore(data);
    }
    getReport();
    
  }, []);

  return (
    <>
      {store ? (
        <div className="DashboardContainer">
          <Typography variant="h3" color="initial" className="Title">Via Única</Typography>

          <Typography variant="h5" className="SubTitle">Dia</Typography>
          <div className="DataCards">
            <KPICards KPIName="Vendas" KPIData={Localization(store.daySales)}></KPICards>
            <KPICards KPIName="TM" KPIData={Localization(store.dayAverageSales)}></KPICards>
            <KPICards KPIName="PV" KPIData={store.dayProductsPerSale}></KPICards>
          </div>

          <Divider variant="middle" />
          <Typography variant="h5" className="SubTitle">Mês</Typography>
          <div className="DataCards">
            <KPICards KPIName="Vendas" KPIData={Localization(store.monthSales)}></KPICards>
            <KPICards KPIName="TM" KPIData={Localization(store.monthAverageSales)}></KPICards>
            <KPICards KPIName="PV" KPIData={store.monthProductPerSale}></KPICards>
          </div>
          <Divider variant="middle" />

          <Typography variant="h5" className="SubTitle">Vendedores</Typography>
          <SellersTable sellersArray={store.sellersArray}/>
        </div>
      ) : (
        <Skeleton variant="rect" width={210} height={118} />
      )}
    </>
  )
}