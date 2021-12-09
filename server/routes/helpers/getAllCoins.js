export default function getAllCoins(req, res, coins) {
    const from = req.query.from || 0;
    const to = req.query.to || 10;

    const resCoins = coins.slice(from, to);
  
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
  
    res.status(200).send(resCoins);
  }