require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const productRoute = require('./routes/productRoute');
const saleRoute = require('./routes/saleRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(bodyParser.json());

app.use('/products', productRoute);
app.use('/sales', saleRoute);
app.use('/', errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});