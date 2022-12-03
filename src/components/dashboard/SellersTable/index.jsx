import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Localization from "../../../utils/Localization";

export function SellersTable({ sellersArray }) {
  return(
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Vendedor(a)</TableCell>
            <TableCell align="right">Fat.</TableCell>
            <TableCell align="right">Vendas</TableCell>
            <TableCell align="right">TM</TableCell>
            <TableCell align="right">Pe</TableCell>
            <TableCell align="right">PV</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellersArray.map(seller => (
            <TableRow key={seller.name}>
              <TableCell component="th" scope="row">{seller.name}</TableCell>
              <TableCell align="right">{Localization(seller.totalSales)}</TableCell>
              <TableCell align="right">{seller.salesCount}</TableCell>
              <TableCell align="right">{Localization(seller.averageSales)}</TableCell>
              <TableCell align="right">{seller.itemsCount}</TableCell>
              <TableCell align="right">{seller.productsPerSale}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}