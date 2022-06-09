import { Card, CardContent, CardHeader, Typography, Tooltip } from "@mui/material";

import InfoOutlinedIcon  from '@mui/icons-material/InfoOutlined';

export function KPICards({KPIName, KPIData, toolTipText}) {
  return (
    <Card className="Card">
      <CardHeader title={KPIName} action={<Tooltip title={toolTipText}><InfoOutlinedIcon /></Tooltip>}/>
      <CardContent>
        <Typography>{KPIData}</Typography>
      </CardContent>
    </Card>
  )
}