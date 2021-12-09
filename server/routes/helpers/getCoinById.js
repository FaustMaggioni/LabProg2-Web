import { getSingleCoinData } from "../../services/getCoinsData.js";

export default async function(req,res) {
    try {
      const id = req.params.id;
      const coin = await getSingleCoinData(id);
      res.status(200).send(coin);
    } catch (error) {
      res.status(500).send("error interno del servidor");
    }
  }