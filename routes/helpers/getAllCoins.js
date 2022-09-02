export default function getAllCoins(req, res, coins) {
  console.log("getAllCoins");
  let from = req.query.from || 0;
  let to = req.query.to || 10;

  from = Number(from);
  to = Number(to);

  if (isNaN(from) || isNaN(to)) {
    res.status(400).send("<h1> Peticion incorrecta </h1>");
    return;
  }

  const resCoins = coins.slice(from, to);

  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).send(resCoins);
}
