import { useState, useEffect } from 'react';

import { KPICards } from './KPICards';
import { SellersTable } from './SellersTable';

import { Divider, Skeleton, Typography } from '@mui/material';

import Localization from '../../utils/Localization';

import { getDashboardData } from '../../report/SalesReport';



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
          <Typography variant="h3" color="initial" className="Title">🏢 {process.env.REACT_APP_STORE_NAME}</Typography>

          <Typography variant="h5" className="SubTitle" sx={{marginTop: 2}}>Dia</Typography>
          <div className="DataCards">
            <KPICards KPIName="Vendas" KPIData={Localization(store.dayTotalSales)} toolTipText="Total em vendas."></KPICards>
            <KPICards KPIName="TM" KPIData={Localization(store.dayAverageSales)} toolTipText="Ticket médio."></KPICards>
            <KPICards KPIName="Peças" KPIData={store.dayItemsCount} toolTipText="Peças vendidas."></KPICards>
            <KPICards KPIName="PV" KPIData={store.dayProductsPerSale} toolTipText="Peças por venda."></KPICards>
          </div>

          <SellersTable sellersArray={store.daySellersArray}/>

          <Divider variant="middle" />
          <Typography variant="h5" className="SubTitle" sx={{marginTop: 2}}>Mês</Typography>
          <div className="DataCards">
            <KPICards KPIName="Vendas" KPIData={Localization(store.monthTotalSales)} toolTipText="Total em vendas."></KPICards>
            <KPICards KPIName="TM" KPIData={Localization(store.monthAverageSales)} toolTipText="Ticket médio."></KPICards>
            <KPICards KPIName="Peças" KPIData={store.monthItemsCount} toolTipText="Peças vendidas."></KPICards>
            <KPICards KPIName="PV" KPIData={store.monthProductsPerSale} toolTipText="Vendas"></KPICards>
          </div>
          <Divider variant="middle" />
          <SellersTable sellersArray={store.monthSellersArray}/>

        </div>
      ) : (
        <Skeleton variant="rect" width={210} height={118} />
      )}
    </>
  )
}