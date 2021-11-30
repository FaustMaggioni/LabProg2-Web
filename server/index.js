import { RSA_NO_PADDING } from "constants";
import express from "express";
import { getCoinsData, getSingleCoinData } from "./services/getCoinsData.js";
import fs from "fs";

const app = express();
let coins;
const DIEZ_MINUTOS = 1000 * 60 * 10;

setInterval(async () => {
  coins = await getCoinsData();
}, DIEZ_MINUTOS);

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

  res.send(resCoins);
});

app.listen(5000, async () => {
  coins = await getCoinsData();
  console.log("Aplicación ejemplo, escuchando el puerto 5000!");
});

app.get("/api/coin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const coin = await getSingleCoinData(id);
    res.send(coin);
  } catch (error) {
    
  }
})

//api alternativa
function functhen() {
  console.log("eeeso tilin");
}
app.post("/api/mycoins/", async (req, res) => {
  let newCoin = req.body;
  fs.readFile("../server/data/coins.json", (err, coinsJSON) => {
    if (err) {
      res.send("error");
    } else {
      let coinsList = JSON.parse(coinsJSON);
      console.log(coinsList);
      coinsList.push(newCoin);
      fs.writeFile(
        "../server/data/coins.json",
        JSON.stringify(coinsList, null, 2),
        (err) => {
          if (err) throw err;
          console.log("Data written to file");
        }
      );
      res.send(req.body);
    }
  });
});

app.get("/api/mycoins", async (req, res) => {
  fs.readFile("../server/data/coins.json", (err, data) => {
    if (err) {
      res.send("error");
    } else {
      let coins = JSON.parse(data);
      console.log(coins);
      res.send(coins);
    }
  });
});
