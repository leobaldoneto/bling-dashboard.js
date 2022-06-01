import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export function KPICards({KPIName, KPIData}) {
  return (
    <Card className="Card">
      <CardHeader title={KPIName} />
      <CardContent>
        <Typography>{KPIData}</Typography>
      </CardContent>
    </Card>
  )
}