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

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));