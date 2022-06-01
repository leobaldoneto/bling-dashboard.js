require('dotenv').config()
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

// Proxy da API do Bling
app.use('/Api/v2', createProxyMiddleware({
  target: 'https://bling.com.br',
  secure: true,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    const newPath = path.replace('willbechangedinproxy', process.env.STORE_KEY);
    console.log(process.env.STORE_KEY);
    console.log(newPath);
    return newPath;
  },
  logLevel: 'debug',
}));

// Fazer com que o Node sirva os arquivos do app em React criado
app.use(express.static(path.resolve(__dirname, '../client/build')));

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