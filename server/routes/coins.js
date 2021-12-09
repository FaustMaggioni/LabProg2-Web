import express from "express";
import { getAllCoins, getCoinById } from "./helpers/index.js";
import { getCoinsData } from "../services/getCoinsData.js";
import fs from "fs";

export const router = express.Router();

let coins;
const DIEZ_MINUTOS = 1000 * 60 * 10;

setInterval(async () => {
    coins = await getCoinsData();
  }, DIEZ_MINUTOS);

router.use( async (req, res, next) => {
    coins = await getCoinsData();
    next();
})
router.get("/", async (req, res) => getAllCoins(req, res, coins));

router.get("/:id", async (req, res) => getCoinById(req, res));

router.post("/", async (req, res) => {
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


//api alternativa
/*
app.get("/api/mycoins", async (req, res) => {
    fs.readFile("../server/data/coins.json", (err, data) => {
      if (err) {
        res.status(500).send("error interno del servidor");
      } else {
        let coins = JSON.parse(data);
        console.log(coins);
        res.status(200).send(coins);
      }
    });
  });*/