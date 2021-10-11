
import express from 'express';
import CoinGecko from 'coingecko-api';

const app = express();
const CoinGeckoClient = new CoinGecko();

const func = async() => {
    let { data } = await CoinGeckoClient.coins.all();
    const min_data = data.slice(0,8);
    const aux = min_data.map((coin) => (
      {
        id: coin.id, 
        name: coin.id, 
        symbol: coin.symbol, 
        price: coin.market_data.current_price.usd, 
        image: coin.image.small,
      }
    ))
    const res = {
      data: aux,
    }
    return res;
  };

app.get('/', async function(req, res) {
    const coins = await func();
    res.json(coins)
  });
  
  app.listen(3000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
  });
