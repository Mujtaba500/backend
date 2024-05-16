import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbhost = process.env.DB_HOST;

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbhost,
  dialect: "postgres",
  logging: console.log,
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { connectDb };
export default sequelize;
