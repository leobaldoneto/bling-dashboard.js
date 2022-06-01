require('dotenv').config()
const path = require('path');
const express = require('express');

const SalesReport = require('./routes/SalesReport.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Fazer com que o Node sirva os arquivos do app em React criado
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Lidar com as solicitações GET feitas à rota /api
/*app.get("/api/", (req, res) => {
  res.json({ message: "Hello from server!" });
});*/

app.get('/api/salesreport', async (req, res) => {
  const storeData = await SalesReport(process.env.STORE_NAME, process.env.STORE_KEY); //NAO FAZER COMMIT ANTES DE MUDAR
  console.log(process.env.STORA_NAME);
  console.log(storeData);
  res.json(storeData);
});

app.get('/api/reports/sales/day', async (req, res) => {
  const dayData = {
    "sales": [
      {
        "date": "2022-05-28",
        "seller": "Vendedor 1",
        "productCount": 1,
        "saleTotal": 140.80
      },
      {
        "date": "2022-05-28",
        "seller": "Vendedor 2",
        "productCount": 2,
        "saleTotal": 199.90
      },
      {
        "date": "2022-05-28",
        "seller": "Vendedor 2",
        "productCount": 3,
        "saleTotal": 140.70
      },
      {
        "date": "2022-05-28",
        "seller": "Vendedor 3",
        "productCount": 2,
        "saleTotal": 299.8
      }
    ],
    "beforeSales": [
      {
        "date": "2022-05-27",
        "seller": "Vendedor 1",
        "productCount": 1,
        "saleTotal": 140
      },
      {
        "date": "2022-05-27",
        "seller": "Vendedor 3",
        "productCount": 4,
        "saleTotal": 380.70
      }
    ]
  }
  setTimeout(() => {  res.json(dayData); }, 500);
});

app.get('/api/reports/sales/month', async (req, res) => {
  const monthData = {
    "sales": [
      {
        "date": "date",
        "seller": "Vendedor 1",
        "productCount": 1,
        "saleTotal": 140
      },
      {
        "date": "date",
        "seller": "Vendedor 1",
        "productCount": 1,
        "saleTotal": 140
      }
    ],
    "beforeSales": [
      {
        "date": "date",
        "seller": "Vendedor 1",
        "productCount": 1,
        "saleTotal": 140
      },
      {
        "date": "date",
        "seller": "Vendedor 1",
        "productCount": 1,
        "saleTotal": 140
      }
    ]
  }
  setTimeout(() => {  res.json(monthData); }, 2000);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});