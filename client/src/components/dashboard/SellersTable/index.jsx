import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Localization from "../../../utils/Localization";

function createData(seller, sales, tm, pv) {
  return { seller, sales, tm, pv };
}

const rows = [
  createData('Jaciara', 841.4, 129.9, 2),
  createData('Verônica', 319.9, 149.9, 4),
  createData('Lene', 309.9, 199.9, 3),
  createData('Gessica', 155, 155, 1),
  createData('Via', 400, 400, 3),
];

export function SellersTable({ sellers }) {
  return(
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Vendedor(a)</TableCell>
            <TableCell align="right">Vendas</TableCell>
            <TableCell align="right">TM</TableCell>
            <TableCell align="right">PV</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">{row.seller}</TableCell>
              <TableCell align="right">{Localization(row.sales)}</TableCell>
              <TableCell align="right">{Localization(row.tm)}</TableCell>
              <TableCell align="right">{row.pv}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}