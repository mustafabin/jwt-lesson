import express from "express";
import logger from "morgan";
import chalk from "chalk";
import cors from "cors";
import db from "./connection/connection.js";
import router from "./router/routes.js";
const PORT = 3000;
let app = express();
//logger allows us to see all the requests made to our
//API from the terminal
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/", router);

//We only start our express server when connection has been made
db.on("connected", () => {
  console.clear();
  console.log(chalk.greenBright("Connected to MongoDB! ( ͡° ͜ʖ ͡°)"));
  app.listen(PORT, () => {
    console.log(
      chalk.cyan(`JWT Practice server running on: http://localhost:${PORT}`)
    );
  });
});
