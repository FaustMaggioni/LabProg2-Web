import { v4 as makeId } from "uuid";
import fs from "fs";

export default function addNewCoin(req, res) {
  const coin = req.body;
  console.log(req.body);
  const { name, image, price } = coin;

  if (!name || !price) {
    res.sendStatus(404).send("<h1> Credenciales invalidas </h1>");
    return;
  }

  fs.readFile("../../data/coins.json", (err, coinsJSON) => {
    if (err) {
      console.log("1: ", err.message);
      res.status(500).send("error interno del servidor");
    } else {
      const coinsList = JSON.parse(coinsJSON);
      const newCoin = { ...coin, id: makeId() };
      coinsList.coins.push(newCoin);
      const coinsListAsString = JSON.stringify(coinsList, null, 2);

      fs.writeFile("server/data/coins.json", coinsListAsString, (err) => {
        if (err) {
          console.log("2: ", err.message);
          res.status(500).send("error interno del servidor");
        } else {
          console.log(`se agrego ${req.body.id} a la lista`);
          res.status(200).send(req.body);
        }
      });
    }
  });
}
