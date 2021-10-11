
import express from 'express';
import CoinGecko from 'coingecko-api';

const app = express();
const CoinGeckoClient = new CoinGecko();

const getCoinsData = async() => {
    let { data } = await CoinGeckoClient.coins.all();
    const min_data = data.slice(0,8);
    const res = min_data.map((coin) => {
      const price = coin.market_data.current_price.usd;
      const percChange7d = coin.market_data.price_change_percentage_7d;
      const priceLastWeek = getPriceLastWeek(price, percChange7d);
      return(
      {
        id: coin.id, 
        name: coin.name, 
        symbol: coin.symbol, 
        price, 
        image: coin.image.small,
        price_last_week: priceLastWeek,
      })
    })
    return res;
  };

const getPriceLastWeek = (current_price, perc) => {
  return current_price - current_price * (perc * 0.01);
}

app.get('/coins', async (req, res) => {
    const coins = await getCoinsData();
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.send(coins)
  });

app.get('/aux', async (req, res) => {
    let { data } = await CoinGeckoClient.coins.all();
    res.send(data[0]);
})
  
  app.listen(5000, () => {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
  });
