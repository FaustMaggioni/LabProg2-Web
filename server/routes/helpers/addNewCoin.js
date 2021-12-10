import { v4 as makeId } from 'uuid';
import fs from "fs";

export default function addNewCoin(req,res) {
    const coin = req.body;
    const { name, image, price } = coin;

    if (!name || !image || !price) {
      res.send(404).send("<h1> Credenciales invalidas </h1>");
      return;
    }

    fs.readFile("../../server/data/coins.json", (err, coinsJSON) => {
      if (err) {
        res.status(500).send("error interno del servidor");
      } else {
        const coinsList = JSON.parse(coinsJSON);
        const newCoin = {...coin, id: makeId()};
        coinsList.coins.push(newCoin);
        const coinsListAsString = JSON.stringify(coinsList, null, 2);

        fs.writeFile("../server/data/coins.json", coinsListAsString, (err) => {
          if (err) {
            res.status(500).send("error interno del servidor");
          } else {
            console.log(`se agrego ${req.body.id} a la lista`);
            res.status(200).send(req.body);
          }
        });
        
      }
    });
  }