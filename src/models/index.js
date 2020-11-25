import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config(); 

const { DATABASE_URL, DATABASE, DATABASE_USER, DATABASE_PASSWORD, TEST_DATABASE } = process.env

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  })
} else {
  sequelize = new Sequelize(DATABASE, DATABASE_USER || TEST_DATABASE, DATABASE_PASSWORD, {
    dialect: "postgres",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
}


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