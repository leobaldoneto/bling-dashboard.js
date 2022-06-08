import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Localization from "../../../utils/Localization";

export function SellersTable({ sellersArray }) {
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
          {sellersArray.map(seller => (
            <TableRow key={seller.name}>
              <TableCell component="th" scope="row">{seller.name}</TableCell>
              <TableCell align="right">{Localization(seller.totalSell)}</TableCell>
              <TableCell align="right">{Localization(0.01)}</TableCell>
              <TableCell align="right">{0.1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}