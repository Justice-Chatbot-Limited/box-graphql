import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config(); 

const { DATABASE, DATABASE_USER, DATABASE_PASSWORD } = process.env

const sequelize = new Sequelize(DATABASE, DATABASE_USER, DATABASE_PASSWORD, {
  dialect: "postgres",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const models = {
  User: sequelize.import("./user"),
  Message: sequelize.import("./message"),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;