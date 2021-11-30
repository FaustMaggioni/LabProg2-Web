import CoinGecko from 'coingecko-api';

const CoinGeckoClient = new CoinGecko();

const getPriceLastWeek = (current_price, perc) => {
    return (current_price - current_price * (perc * 0.01)).toFixed(2);
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

export const getSingleCoinData = async (id) => {
  let { data } = await CoinGeckoClient.coins.fetch(id);
  const price = data.market_data.current_price.usd.toFixed(2);
  console.log(price)
  const percChange7d = data.market_data.price_change_percentage_7d;
  const priceLastWeek = getPriceLastWeek(price, percChange7d);
  console.log(priceLastWeek, data.name, data.image.large, data.market_cap_rank)
  const res = {
    name: data.name,
    image: data.image.large,
    marketRank: data.market_cap_rank,
    date: data.genesis_date,
    description: data.description.en,
    price,
    priceLastWeek,
  }
  console.log(res);
  return res;
}