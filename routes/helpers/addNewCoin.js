import { v4 as makeId } from "uuid";
import fs from "fs";
import path from "path";

export default function addNewCoin(req, res) {
  const coin = req.body;

  if (coin.price) {
    coin.price = Number(coin.price);
  }

  if (coin.price_last_week) {
    coin.price_last_week = Number(coin.price_last_week);
  }

  const { name, image, price, price_last_week } = coin;

  if (!name || !price || !price_last_week) {
    res.sendStatus(404).send("<h1> Credenciales invalidas </h1>");
    return;
  }

  console.log(process.cwd());

  const filename = process.cwd() + "/data/coins.json";

  fs.readFile(filename, (err, coinsJSON) => {
    if (err) {
      console.log("1: ", err.message);
      res.status(500).send("error interno del servidor");
    } else {
      const coinsList = JSON.parse(coinsJSON);
      const newCoin = { ...coin, id: makeId() };
      coinsList.coins.push(newCoin);
      const coinsListAsString = JSON.stringify(coinsList, null, 2);

      fs.writeFile(filename, coinsListAsString, (err) => {
        if (err) {
          console.log("2: ", err.message);
          res.status(500).send("error interno del servidor");
        } else {
          console.log(`se agrego ${newCoin.id} a la lista`);
          res.status(200).send(req.body);
        }
      });
    }
  });
}
