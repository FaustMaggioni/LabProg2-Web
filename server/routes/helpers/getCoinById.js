import { getSingleCoinData } from "../../services/getCoinsData.js";

export default async function(req,res) {
  const id = req.params.id;
    try {
      const coin = await getSingleCoinData(id);
      console.log(coin)
      res.status(200).send(coin);
    } catch (error) {
      if (error.code === 404) {
        res.status(404).send(`<h1> Moneda con id "${id}" no encontrada, codigo de error: <b> ${error.code} </b> </h1>`)
      } else {
        res.status(500).send("<h1> Error interno del servidor </h1> ");
      }
    }
  }