import { RSA_NO_PADDING } from "constants";
import express from "express";
import { getCoinsData } from "./services/getCoinsData.js";
import fs from "fs";
const app = express();
let coins;
const DIEZ_MINUTOS = 1000 * 60 * 10;

app.use(express.static("public"));
app.use("/static", express.static("public"));

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
  console.log("Aplicación ejemplo, escuchando el puerto 5000!");
});

setInterval(async () => {
  coins = await getCoinsData();
}, DIEZ_MINUTOS);

//api alternativa

app.put("/api/mycoins/:id", async (req, res) => {

  let name = req.params.name;
  console.log("tengo que ver como hacer el put jajan't");
  res.send(name);
});

app.get("/api/mycoins", async (req, res) => {
  fs.readFile("../server/data/coins.json", (err, data) => {
    if (err) {
      res.send("error");
    }else{
      let coins = JSON.parse(data);
      console.log(coins);
      res.send(coins);
    };
  });
});
