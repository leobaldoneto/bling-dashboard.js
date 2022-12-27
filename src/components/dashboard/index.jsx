import { Divider, Typography } from '@mui/material';

import Localization from '../../utils/Localization';

import { KPICards } from './KPICards';
import { SellersTable } from './SellersTable';
import { SalesChart } from './SalesChart';

export function Dashboard ({ store }) {
  return (
    <>
      <div className="DashboardContainer">
        <Typography variant="h3" color="initial" className="Title">🏢 {store.storeName}</Typography>

        <Typography variant="h5" className="SubTitle" sx={{marginTop: 2}}>📅Dia</Typography>
        <div className="DataCards">
          <KPICards KPIName="Fat." KPIData={Localization(store.dayTotalSales ?? 0)} toolTipText="Total em vendas." />
          <KPICards KPIName="Vendas" KPIData={store.daySalesCount} toolTipText="Número de vendas." />
          <KPICards KPIName="TM" KPIData={Localization(store.dayAverageSales)} toolTipText="Ticket médio." />
          <KPICards KPIName="Peças" KPIData={store.dayItemsCount} toolTipText="Peças vendidas." />
          <KPICards KPIName="PV" KPIData={store.dayProductsPerSale} toolTipText="Peças por venda." />
        </div>

        <SellersTable sellersArray={store.daySellersArray} />

        <Divider variant="middle" />
        <Typography variant="h5" className="SubTitle" sx={{marginTop: 2}}>📅Mês</Typography>
        <div className="DataCards">
          <KPICards KPIName="Fat." KPIData={Localization(store.monthTotalSales)} toolTipText="Total em vendas." />
          <KPICards KPIName="Vendas" KPIData={store.monthSalesCount} toolTipText="Número de vendas." />
          <KPICards KPIName="TM" KPIData={Localization(store.monthAverageSales)} toolTipText="Ticket médio." />
          <KPICards KPIName="Peças" KPIData={store.monthItemsCount} toolTipText="Peças vendidas." />
          <KPICards KPIName="PV" KPIData={store.monthProductsPerSale} toolTipText="Vendas" />
        </div>
        <Divider variant="middle" />
        <SellersTable sellersArray={store.monthSellersArray}/>

        <Divider variant="middle" />
        <SalesChart salesArray={store.monthSalesArray} meta={store.storeMeta} />
      </div>
    </>
  )
}

