import express from 'express';
import { getCoinsData } from './services/getCoinsData.js';

const app = express();
let coins;
const DIEZ_MINUTOS = 1000 * 60 * 10;

app.use(express.static("public"));
app.use("/static", express.static("public"));

app.get('/api/coins/:from?/:to?', async (req, res) => {
    const from = req.params.from || 0;
    const to = req.params.to || 10;

    const resCoins = coins.slice(from,to);

    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');

app.get('/aux', async (req, res) => {
    let { data } = await CoinGeckoClient.coins.all();
    res.send(data[0]);
})
  
  app.listen(5000, () => {
    console.log('Aplicación ejemplo, escuchando el puerto 5000!');
  });


    res.send(resCoins);
  });

app.listen(5000, async () => {
  coins = await getCoinsData();
  console.log('Aplicación ejemplo, escuchando el puerto 5000!');
});

setInterval(async () => {
  coins = await getCoinsData();
}, DIEZ_MINUTOS)
>>>>>>> 66fe9e82e40655996f1491eaef6d1c76ec771ccd
