import chalk from "chalk";
import db from "../connection/connection.js";
import User from "../models/user.js";

const deleteAll = async () => {
  console.log(chalk.red(chalk.bold("Purging Database (Ф_Ф)  ...")));

  await User.deleteMany({});
  console.log(
    chalk.green(chalk.bold("Successfully deleted all users (ᴗ ͜ʖ ᴗ)"))
  );

  db.close();
};

deleteAll();
