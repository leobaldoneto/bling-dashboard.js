import { KPICards } from './KPICards';

import { Typography } from '@mui/material';

import Localization from '../../utils/Localization';



export function Dashboard () {
  return (
    <div className="DashboardContainer">
      <Typography variant="h3" color="initial" className="Title">Via Única</Typography>

      <Typography variant="h5">Dia</Typography>
      <div className="DataCards">
        <KPICards KPIName="Vendas" KPIData={Localization(1800)}></KPICards>
        <KPICards KPIName="TM" KPIData={Localization(129.80)}></KPICards>
        <KPICards KPIName="PV" KPIData={1.8}></KPICards>
      </div>

      <Typography variant="h5">Mês</Typography>
      <div className="DataCards">
        <KPICards KPIName="Vendas" KPIData={Localization(54672)}></KPICards>
        <KPICards KPIName="TM" KPIData={Localization(124.65)}></KPICards>
        <KPICards KPIName="PV" KPIData={1.5}></KPICards>
      </div>
      {/*Adicionar divisor*/}

      <Typography variant="h5">Vendedores</Typography>
      {/*<SellersTable*/}
    </div>
  )
}