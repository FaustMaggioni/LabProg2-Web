import { RSA_NO_PADDING } from "constants";
import express from "express";
import { getCoinsData } from "./services/getCoinsData.js";
import fs from "fs";

const app = express();
let coins;
const DIEZ_MINUTOS = 1000 * 60 * 10;

app.use(express.static("public"));
app.use("/static", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/coins/:from?/:to?", async (req, res) => {
  const from = req.params.from || 0;
  const to = req.params.to || 10;

  const resCoins = coins.slice(from, to);

  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");

  app.get("/aux", async (req, res) => {
    let { data } = await CoinGeckoClient.coins.all();
    res.send(data[0]);
  });

  res.send(resCoins);
});

app.listen(5000, async () => {
  coins = await getCoinsData();
  console.log("servidor COINS, escuchando el puerto 5000!");
});

setInterval(async () => {
  coins = await getCoinsData();
}, DIEZ_MINUTOS);

//api alternativa

app.post("/api/mycoins/", async (req, res) => {
  const newCoin = req.body;
  fs.readFile("../server/data/coins.json", (err, coinsJSON) => {
    if (err) {
      res.status(500).send("error interno del servidor");
    } else {
      const coinsList = JSON.parse(coinsJSON);
      const coinYaExisteEnLaLista = coinsList.coins.find((e) => {
        return e.id === req.body.id;
      });
      if (coinYaExisteEnLaLista)
        coinsList.coins = coinsList.coins.filter((e) => {
          return e.id !== req.body.id;
        });
      coinsList.coins.push(newCoin);
      const coinsListAsString = JSON.stringify(coinsList, null, 2);
      fs.writeFile("../server/data/coins.json", coinsListAsString, (err) => {
        if (err) {
          res.status(500).send("error interno del servidor");
        } else {
          if (coinYaExisteEnLaLista) {
            console.log(`se actualizo ${req.body.id} de la lista`);
          } else {
            console.log(`se agrego ${req.body.id} a la lista`);
          }
          res.status(200).send(req.body);
        }
      });
    }
  });
});

app.get("/api/mycoins", async (req, res) => {
  fs.readFile("../server/data/coins.json", (err, data) => {
    if (err) {
      res.satuts(500).send("error interno del servidor");
    } else {
      let coins = JSON.parse(data);
      console.log(coins);
      res.status(200).send(coins);
    }
  });
});
