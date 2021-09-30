import express from 'express';
import CoinGecko from 'coingecko-api';

const app = express();
const CoinGeckoClient = new CoinGecko();

const func = async() => {
    let data = await CoinGeckoClient.ping();
    console.log(data);
  };

app.get('/', function(req, res) {
    res.send('Hola Mundo!');
  });
  
  app.listen(3000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
    func();
  });
