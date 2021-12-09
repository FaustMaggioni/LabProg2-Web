import express from "express";
import dotenv from "dotenv";
import { router as coinsRouter } from './routes/coins.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
app.use("/static", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/coins", coinsRouter);

app.listen(PORT, async () => {
  console.log(`servidor COINS, escuchando el puerto ${PORT}!`);
});
