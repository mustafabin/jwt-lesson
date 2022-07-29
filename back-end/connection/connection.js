import mongoose from "mongoose";
import chalk from "chalk";

let mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let connectionString = "mongodb://127.0.0.1:27017/jwtPractice";

mongoose.connect(connectionString, mongooseConfig);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error(chalk.red(error));
});

db.once("disconnected", () => {
  console.log(chalk.italic(chalk.redBright("Disconnected from MongoDB")));
});

export default db;
