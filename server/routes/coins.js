import express from "express";
import { addNewCoin, getAllCoins, getCoinById } from "./helpers/index.js";
import { getCoinsData } from "../services/getCoinsData.js";

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

router.post("/", async (req, res) => addNewCoin(req,res));


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