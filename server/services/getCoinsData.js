import CoinGecko from 'coingecko-api';

const CoinGeckoClient = new CoinGecko();

const getPriceLastWeek = (current_price, perc) => {
    return current_price - current_price * (perc * 0.01);
  }

export const getCoinsData = async () => {
    let { data } = await CoinGeckoClient.coins.all();
    const res = data.map((coin) => {
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